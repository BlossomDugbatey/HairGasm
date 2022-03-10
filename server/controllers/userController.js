require('../models/mongooseConnection');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const Util = require('./authorization');

exports.user = async (req, res) => {
    const authorizedRoles = ["admin"]
    Util.authorization(req,res,authorizedRoles);
    const users = await User.find({})
    res.render('users/userView', {title: "user", activeNav: "users", users})
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
    res.render("users/edit", {
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
    res.render("users/add", {
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
    res.render("users/delete", {
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

exports.profile = async (req,res) => {
    res.render("users/profile", {title:"profile", activeNav: "profile", message: req.flash().success});
}

exports.changePassword = async (req,res) => {
    res.locals.csrfToken = req.csrfToken();
    res.render("users/changePassword",{title: "Change Password", activeNav: "profile", force_change: 0});
}

exports.submitPassword = async (req,res) => {
    console.log(req.body)
    res.locals.csrfToken = req.csrfToken();
    const currentPasswordVerification = await bcrypt.compare(req.body.current_password, req.user.password);
    if (!currentPasswordVerification) {
        req.flash("error", "Incorrect Password")
    } else {
        const confirmPasswordUpdate = req.body.new_password === req.body.confirm_password;
        if (!confirmPasswordUpdate) {
            req.flash("error", "Password don't match")
        } else {
            const newHashedPassword = await bcrypt.hash(req.body.new_password, 10);
            await User.updateOne({_id: req.user._id}, {password: newHashedPassword, force_change_password: false})
            req.flash("success", "Password Changed Successfully")
            return res.redirect('/profile')
        }
    }
    res.render("users/changePassword",{title: "Change Password", activeNav: "profile", message: req.flash().error});
}

exports.forcePassword = async (req,res) => {
    const authorizedRoles = ["admin"]
    Util.authorization(req,res,authorizedRoles); 
    res.locals.csrfToken = req.csrfToken();
    res.render("users/forceChangePassword", {title: "Force Password", activeNav: "users", message: req.flash().error})
}

exports.forcePasswordUpdate = async (req,res) => {
    if (req.body.force_change_password) {
        const user = await User.updateOne({ _id: req.params.id}, {force_change_password: true});
    }
        res.redirect('/users')
    // const user = await User.findById({})  
}
