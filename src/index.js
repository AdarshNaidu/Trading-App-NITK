const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');


const PORT = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, './Templates/views');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath));
app.set('views', viewsPath);

app.use(session({
    secret: "privatekey",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

require('./database/database.js');

const User = require('./database/user');

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.get('/sell', (req, res) => {
    if(req.isAuthenticated()){
        res.render('sell');
    }else{
        res.redirect('/login');
    }
})

app.post('/users', (req, res) => {
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

app.listen(PORT, (error, resp) => {
    console.log(`The server is listening at ${PORT}`)
})
