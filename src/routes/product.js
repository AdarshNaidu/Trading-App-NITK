const express = require('express');
const User = require('../database/models/user');
const Product = require('../database/models/product');
const Require = require('../database/models/require');
const Transaction = require('../database/models/transaction');
const multer = require('multer');

//Defining multer function for image upload
const upload = multer({
})

const router = express.Router();

//Endpoint to register a product
router.post('/products', upload.single('image'), (req, res) => {
    const product = new Product({name: req.body.name, age: req.body.age, owner: req.user._id, cost: req.body.cost, image: req.file.buffer});
    product.save().then(() => {
        res.redirect('/');
    }).catch((error) => {
        console.log(error)
        res.status(500).send("Cannot register your product")
    })
})

//Endpoint to get all the products
router.get('/products', async(req, res) => {
    const products = await Product.find({sold: false});
    for(const product of products){
        await product.populate('owner').execPopulate();
    }
    res.send(products);
})

//Endpoint to buy a product
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

router.post('/require', (req, res) => {
    console.log(req.body)
    const require = new Require({name: req.body.name, owner: req.user._id, cost: req.body.cost});
    require.save().then(() => {
        res.redirect('/');
    }).catch((error) => {
        console.log(error)
        res.status(500).send("Cannot register your product")
    })
})

router.get('/required', async (req, res) => {
    const required = await Require.find({});
    for(const require of required){
        await require.populate('owner').execPopulate();
    }
    res.send(required);
})

module.exports = router;