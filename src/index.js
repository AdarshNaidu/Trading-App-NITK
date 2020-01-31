const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');


const PORT = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, './Templates/views');
const partialsPath = path.join(__dirname, './Templates/partials');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath));
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(userRouter)
app.use(productRouter)


require('./database/database.js');

const User = require('./database/models/user');


//Index Page
app.get('/', async (req, res) => {
    res.render('index');
})


//Login Page
app.get('/login', (req, res) => {
    res.render('login');
})


//Registering page
app.get('/register', (req, res) => {
    res.render('register');
})


//Selling Page
app.get('/sell', (req, res) => {
    if(req.isAuthenticated()){
        res.render('sell');
    }else{
        res.redirect('/login');
    }
})


//404 Page
app.get('*', (req, res) => {
    res.render('404');
})

app.listen(PORT, (error, resp) => {
    console.log(`The server is listening at ${PORT}`)
})