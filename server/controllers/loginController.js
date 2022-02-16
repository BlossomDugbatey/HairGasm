require('../models/mongooseConnection')
const LOGIN = require('../models/Login')

exports.login = async(req,res) => {
    res.locals.csrfToken = req.csrfToken();
    res.render('users/login', {title : "Login"})
}

exports.checkLogin = (req,res) => {
    // console.log(res);
    res.redirect('/')
}

exports.profile = (req,res) => {

}