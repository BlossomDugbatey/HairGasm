const router = require('express').Router();

const controller = require('../controllers/loginController');
const userController = require('../controllers/userController');
const User = require('../models/User');

const passport = require('passport');
const LocalStrategy = require ('passport-local');
const bcrypt = require('bcrypt');



passport.use(
    new LocalStrategy ({passReqToCallback : true},
        async function verify(req, username, password, cb) {
        let user = await User.findOne({phone: username})
        if(user){
            if(user.active){
                const passwordVerified = await bcrypt.compare(password, user.password);
                if (passwordVerified){
                    return cb(null,user);//verification successful
                    }
            }else{
                return cb(null,false, {message: 'Your account has been deactivated!'});
            }

        }  
         loginTracker(req, user);
         return cb(null,false, {message: 'Incorrect Details!'});//verification failed
    })
);


passport.serializeUser(function(user, cb) {
    return cb (null,user);
});

passport.deserializeUser(function(user, cb) {
    return cb (null,user);
});

//enforce user to change password
const enforcePasswordChange = async (req,res,next) => {
    res.locals.csrfToken = req.csrfToken();
    const force_change = req.body.force_change || false;
    if ((req.isAuthenticated()) && (force_change !== 'undefined') && (force_change === false)) {
        const user = await User.findById(req.user._id)
        const forcePasswordChange = user.force_change_password || false
        if (forcePasswordChange){
            console.log(true)
            res.render("users/changePassword", {title: "Force Password", activeNav: "users", force_change: 1})
        } else {
            console.log("middle man")
            next()
        }
    } else {
        console.log("next man")
        next()
    }
}
//track login
const loginTracker = async(req, user) => {
    const session = req.session;

    if(!session.maxFailedAttempts){
        session.maxFailedAttempts = 3; 
    }else{
        session.maxFailedAttempts -= 1;

        const maxFailedAttempts = session.maxFailedAttempts;
        if(maxFailedAttempts <= 1){
            user.active = false;
            await user.save();
        }
    }
}
//white listing home page
// const whitelist ='/'
const checkLoggedIn = (req,res,next) =>{
    res.locals.loggedIn = false;
    res.locals.whitelisted = false;

    if(req.path === '/'){
        res.locals.whitelisted = true;
        if(req.isAuthenticated()){
            res.locals.loggedIn = true;   
        }
    } else {
        if(req.isAuthenticated()){
            res.locals.loggedIn = true;   
        }else {
           return res.redirect('/login')
        }
    }
    // res.locals.user = req.user || {} ;
    next();
}
const userNavigation = (req,res,next) => {
    res.locals.user = req.user || {};
    let navigations = [{href:"/",name:"Home", activeName:"home"}];
    if(req.user) {
        if(req.user.role === 'user'){
            let userNav = {href:"/booking", name: "Booking", activeName: "booking"}; 
            navigations.push(userNav);
        }else{
            let adminNav = [{href:"/booking", name: "Booking", activeName: "booking"},{href:"/slots", name: "Slots", activeName: "slots"},{href:"/users", name: "Users", activeName: "users"}]
            navigations = navigations.concat(adminNav);
        }
    }
    if(req.isAuthenticated()){
        logoutNav = [{href:"/profile",name:"Profile", activeName:"profile"},{href: "/logout", name: "LogOut"}]
        navigations = navigations.concat(logoutNav);
    }else{
        navigations.push({href: "/login", name: "LogIn"});
    }
    res.locals.navigations = navigations;
    next();
}

router.use(passport.initialize());
router.use(passport.session());


//routes for login feature
router.get('/logout', controller.logout);
router.get('/login', controller.login);
router.post('/login', passport.authenticate("local",{failureRedirect: '/login', failureFlash: true}), controller.checkLogin);

router.use(checkLoggedIn)
router.use(userNavigation)
// router.use(enforcePasswordChange)

router.get('/profile', userController.profile);
router.get('/users', userController.user);
router.get('/change-password', userController.changePassword);
router.post('/change-password', userController.submitPassword);
router.get('/force-change-password/:id', userController.forcePassword);
router.post('/force-change-password/:id', userController.forcePasswordUpdate);
router.get('/user-edit/:id', userController.edit);
router.get('/user-add', userController.add);
router.get('/user-delete/:id',userController.delete);
router.post('/user-add', userController.save);
router.post('/user-edit/:id', userController.update);
router.post('/user-delete/:id', userController.deleteConfirm)




module.exports = router;