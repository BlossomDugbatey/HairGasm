const mongoose = require('mongoose')

const Schema = new mongoose.Schema ({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String
    },
    active : {
        type: Boolean,
        default: true,
    },
    role : {
        type: String,
        default: 'user',
    }
})
module.exports = mongoose.model('User', Schema)