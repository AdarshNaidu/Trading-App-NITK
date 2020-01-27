const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sold: {
        type: Boolean,
        default: false
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;