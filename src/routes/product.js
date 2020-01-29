const express = require('express');
const User = require('../database/models/user');
const Product = require('../database/models/product');
const Transaction = require('../database/models/transaction');
const multer = require('multer');

const upload = multer({
})

const router = express.Router();

router.post('/products', upload.single('image'), (req, res) => {
    const product = new Product({name: req.body.name, age: req.body.age, owner: req.user._id, cost: req.body.cost, image: req.file.buffer});
    product.save().then(() => {
        res.redirect('/');
    }).catch((error) => {
        console.log(error)
    })
})

router.get('/products', async(req, res) => {
    const products = await Product.find({sold: false});
    for(const product of products){
        await product.populate('owner').execPopulate();
    }
    res.send(products);
})

router.get('/products/:id', async (req, res) => {
    if(req.user){
        const product = await Product.findById(req.params.id);
        let owner = await User.findById(product.owner.toString());
        if(owner._id.toString() == req.user._id.toString()){
            res.status(405).send();
        } else if(req.user.points >= product.cost){    
            req.user.points -= product.cost;
            await req.user.save();
            owner.points += product.cost;
            await owner.save();
            const transaction = new Transaction({buyer: req.user._id, product: req.params.id, itemName: product.name, cost: product.cost, sellerName: owner.name});
            await transaction.save();
            product.sold = true;
            product.save();
            res.send();
        }else{
            res.status(501).send();
        }
    }else{
        res.status(401).send();
    }
})

module.exports = router;