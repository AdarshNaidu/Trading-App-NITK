const express = require('express');
const User = require('../database/user');
const Product = require('../database/product');

const router = express.Router();

router.post('/products', (req, res) => {
    const product = new Product({name: req.body.name, age: req.body.age, owner: req.user._id, cost: req.body.cost});
    product.save().then(() => {
        res.redirect('/');
    }).catch((error) => {
        console.log(error)
    })
})

router.get('/products/:id', async (req, res) => {
    if(req.user){
        const product = await Product.findById(req.params.id);        
        req.user.points -= product.cost;
        await req.user.save();
        let owner = await User.findById(product.owner.toString());
        owner.points += product.cost;
        await owner.save();
        await product.remove();
        res.send(req.user.points.toString());
    }else{
        res.send("Login first");
    }
})

module.exports = router;