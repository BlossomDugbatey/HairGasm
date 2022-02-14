require('../models/mongooseConnection')
const LOGIN = require('../models/Login')

exports.login = async(req,res) => {
    res.locals.csrfToken = req.csrfToken();
    res.render('users/login', {title : "Login"})
}

exports.checkLogin = async(req,res) => {

}

exports.profile = async(req,res) => {

}