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

app.get('/', async (req, res) => {
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

app.get('*', (req, res) => {
    res.render('404');
})

app.listen(PORT, (error, resp) => {
    console.log(`The server is listening at ${PORT}`)
})

// const Product = require('./database/product');

// const main = async () => {
//     const product = await Product.findById('5e2f3aab40d9a719c456c01d');
//     await product.populate('owner').execPopulate();
//     console.log(product);
// }

// main();

// const Transaction = require('./database/transaction');

// const main = async () => {
//     const transactions = await Transaction.find({buyer: "5e2edd3f30e6c22a984aab4c"})
//     for(const transaction of transactions){
//         await transaction.populate('product').execPopulate();
//         await transaction.product.populate('owner').execPopulate();
//         // console.log(transaction);
//     }
//     console.log(transactions);
// }

// main();