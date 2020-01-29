// const mongoose = require('mongoose');

// const transactionSchema = new mongoose.Schema({
//     buyer: {
//         Type: mongoose.Schema.Types.ObjectId,
//         required: true
//     },
//     product: {
//         Type: mongoose.Schema.Types.ObjectId,
//         required: true
//     },
// })

// const Transaction = mongoose.model('Transaction', transactionSchema);

// module.exports = Transaction;



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
    // sellerName: {
    //     type: String,
    // },
    // itemName: {
    //     type: String,
    // },
    // cost: {
    //     type: Number
    // }
})

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;