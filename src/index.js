const express = require('express');
const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
    res.send("Server connection successful")
})

app.listen(PORT, (error, resp) => {
    console.log(`The server is listening at ${PORT}`)
})