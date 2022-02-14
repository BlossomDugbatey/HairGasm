const { MongoCompatibilityError, ObjectId, MongoDecompressionError} = require('mongodb')
const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId, ref: "User"
    },
    slot: {
        type: mongoose.Types.ObjectId, ref: "Slot"
    },
    service: {
        type: String
    },
})
module.exports = mongoose.model('Booking', Schema)
