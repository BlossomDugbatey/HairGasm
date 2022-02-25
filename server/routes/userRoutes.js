const router = require('express').Router();

const controller = require('../controllers/loginController')
const User = require('../models/User')

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
         return cb(null,false, {message: 'Wrong phone number or password!'});//verification failed
    })
);


passport.serializeUser(function(user, cb) {
    return cb (null,user);
});

passport.deserializeUser(function(user, cb) {
    return cb (null,user);
});


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
    let navigations = [{href:"/",name:"Home"}];
    if(req.user) {
        if(req.user.role === 'user'){
            let userNav = {href:"/booking", name: "Booking"}; 
            navigations.push(userNav);
        }else{
            let adminNav = [{href:"/booking", name: "Booking"},{href:"/slots", name: "Slots"},{href:"/add-user", name: "Users"}]
            navigations = navigations.concat(adminNav);
        }
    }
    if(req.isAuthenticated()){
        navigations.push({href: "/logout", name: "LogOut"});
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
router.get('/profile', controller.profile);




module.exports = router;