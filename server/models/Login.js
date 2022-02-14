const mongoose = require('mongoose')

const Schema = new mongoose.Schema ({
    username: {
        type: String
    },
    password: {
        type: String
    }
})
module.exports = mongoose.model('Login', Schema)