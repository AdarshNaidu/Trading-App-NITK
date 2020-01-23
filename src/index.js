const express = require('express');
const path = require('path');
const hbs = require('hbs');
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