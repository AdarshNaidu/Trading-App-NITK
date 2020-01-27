const express = require('express');
const User = require('../database/user');
const Product = require('../database/product');
const Transaction = require('../database/transaction');

const router = express.Router();

router.post('/products', (req, res) => {
    const product = new Product({name: req.body.name, age: req.body.age, owner: req.user._id, cost: req.body.cost});
    product.save().then(() => {
        res.redirect('/');
    }).catch((error) => {
        console.log(error)
    })
})

router.get('/products', async(req, res) => {
    const products = await Product.find({sold: false});
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
            const transaction = new Transaction({buyer: req.user._id, product: req.params.id});
            await transaction.save();
            product.sold = true;
            product.save();
            res.send(req.user.points.toString());
        }else{
            res.status(501).send();
        }
    }else{
        res.status(401).send();
    }
})

module.exports = router;