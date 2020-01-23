const express = require('express');
const path = require('path');
const hbs = require('hbs');
require('./database/database.js');
// const User = require('./database/user');
const Product = require('./database/product.js');
const PORT = process.env.PORT || 3000;

const app = express();
app.set('view engine', 'hbs');

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, './Templates/views');

app.use(express.static(publicDirectoryPath));
app.set('views', viewsPath);

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.listen(PORT, (error, resp) => {
    console.log(`The server is listening at ${PORT}`)
})

// const user = new User({
//     name: "Adarsh Naidu",
//     email: "naidu.adarsh@email.com",
//     password: "thismypass"
// })

// user.save().then((user) => {
//     console.log("User inserted into the database", user)
// });

const product = new Product({
    name: "watch",
    age: 2,
    address: "fifth block"
})

product.save().then((product) => {
    console.log(product);
}).catch(() => {
    console.log('Unable to save to the database');
})