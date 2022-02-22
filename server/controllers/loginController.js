require('../models/mongooseConnection')
const LOGIN = require('../models/Login')

exports.login = async(req,res) => {
    const message = req.flash().error;
    res.locals.csrfToken = req.csrfToken();
    res.render('users/login', {title : "Login", message})
}

exports.checkLogin = (req,res) => {
    // console.log(res);
    res.redirect('/')
}

exports.profile = (req,res) => {

}

exports.logout = (req,res) => {
    req.logout()
    res.locals.csrfToken = req.csrfToken();
    res.render('users/logout', {title: "logout"})
}