require('../models/mongooseConnection');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const Util = require('./authorization');

exports.user = async (req, res) => {
    const authorizedRoles = ["admin"]
    Util.authorization(req,res,authorizedRoles);
    const users = await User.find({})
    return res.render('users/userView', {title: "user", activeNav: "users", users})
}

// exports.logout =async(req,res)=>{
//     // res.local.csrfToken = req.csrfToken();
//     req.logout()
// res.redirect(302,'/')
// }
exports.edit = async (req, res) => {
    const authorizedRoles = ["admin"]
    Util.authorization(req,res,authorizedRoles);
    res.locals.csrfToken = req.csrfToken()
    const user = await User.findById(req.params.id)
    console.log(user)
    return res.render("users/edit", {
        title: "User Form",
        activeNav: "users",
        user
    })
}
exports.update = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.updateOne({
        _id: req.params.id
    }, {
        name: req.body.name,
        phone: req.body.phone,
        password: hashedPassword,
    })
    res.redirect(302, "/users")
}
exports.add = async (req, res) => {
    const authorizedRoles = ["admin"]
    Util.authorization(req,res,authorizedRoles);
    res.locals.csrfToken = req.csrfToken()
    return res.render("users/add", {
        title: "User From",
        activeNav: "users"
    })
}
exports.save = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        name: req.body.name,
        phone: req.body.phone,
        password: hashedPassword,
    })
    await user.save()
    res.redirect(302, "/users")
}
exports.delete = async (req, res) => {
    const authorizedRoles = ["admin"]
    Util.authorization(req,res,authorizedRoles);
    res.locals.csrfToken = req.csrfToken()
    const user = await User.findById(req.params.id)
    return res.render("users/delete", {
        title: "User Form",
        activeNav: "users",
        user
    })
}
exports.deleteConfirm = async (req, res) => {
    const user = await User.deleteOne({
        _id: req.params.id
    })
    res.redirect(302, "/users")
}