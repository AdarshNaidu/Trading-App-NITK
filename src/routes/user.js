const express = require('express');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('../database/user')
const Product = require('../database/product');

const router = express.Router();

router.use(session({
    secret: "privatekey",
    resave: false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());

router.get('/', async (req, res) => {
    const products = await Product.find({});
    console.log(products);
    res.render('index', {
        items: products
    });
})

router.post('/users', (req, res) => {
    User.register({name: req.body.name, email: req.body.email}, req.body.password, (err, user) => {
        if(err){
            console.log(err);
            res.redirect('/register');
        }else{
            passport.authenticate('local')(req, res, function(){
                res.redirect('/sell');
            })
        }
    })
})

router.post('/users/login', (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    req.login(user, function(err){
        if(err){
            console.log(err);
        }else{
            passport.authenticate('local')(req, res, function(){
                res.redirect('/sell');
            })
        }
    })
})

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

router.post('/products', (req, res) => {
    console.log(req.user);
    console.log(req.body);

    const product = new Product({name: req.body.name, age: req.body.age, owner: req.user._id});
    product.save().then((product) => {
        res.send(product)
    }).catch((error) => {
        console.log(error)
    })
})


module.exports = router;