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

router.get('/admin', async (req, res) => {
    if(req.user){
        if(req.user.admin){
            const users = await  User.find({});
            res.render('admin', {
                users: users
            });
        }else{
            res.status(404).send();
        }
    }else{
        res.redirect('/login');
    }
})

router.post('/users', (req, res) => {
    User.register({name: req.body.name, email: req.body.email}, req.body.password, (err, user) => {
        if(err){
            console.log(err);
            res.redirect('/register');
        }else{
            passport.authenticate('local')(req, res, function(){
                res.redirect('/');
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
                res.redirect('/');
            })
        }
    })
})

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})


router.get('/users/:points/:id', async (req, res) => {
    console.log(req.params);
    const user = await User.findById(req.params.id);
    console.log(user);
    user.points = req.params.points;
    await user.save();
    res.send("Successful update");
})

router.get('/users/points', async (req, res) => {
    if(req.user){
        res.send(req.user.points.toString());
    }else{
        res.status(500).send();
    }
})

module.exports = router;