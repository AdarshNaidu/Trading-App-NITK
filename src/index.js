const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const Require = require('./database/models/require');


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
    let required;
    if(req.user) {required = await Require.find({owner: {$ne: req.user._id}});}
    else {required = await Require.find({});}
    for(const require of required){
        await require.populate('owner').execPopulate();
    }
    res.render('index', {
        required
    }); 
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

app.get('/require', (req, res) => {
    if(req.isAuthenticated()){
        res.render('require');
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