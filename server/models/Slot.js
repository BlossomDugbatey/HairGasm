const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    date: {
        type: Date, required: true
    },
    quantity: {
        type: Number, required: true
    }
})
module.exports = mongoose.model('Slot', Schema)