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
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    time : { 
        type : Date, 
        default: Date.now 
    }
})

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;