const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId, ref: "User"
    },
    booking_date: {
        type: Date
    },
    service: {
        type: String
    }
})
module.exports = mongoose.model('FailedBooking', Schema)