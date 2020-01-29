const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    },
    time : { 
        type : Date, 
        default: Date.now 
    },
})

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;