const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/NITK-Trade',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to database successfully");
}).catch((error) => {
    console.log("Unable to connect to the database");
});

mongoose.set("useCreateIndex", true);