const mongoose = require('mongoose');

const requireSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Require = mongoose.model('Require', requireSchema);

module.exports = Require;