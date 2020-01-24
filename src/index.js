const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user')


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
app.use(userRouter)


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


app.listen(PORT, (error, resp) => {
    console.log(`The server is listening at ${PORT}`)
})
