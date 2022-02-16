const router = require('express').Router();

const controller = require('../controllers/loginController')
const User = require('../models/User')

const passport = require('passport');
const LocalStrategy = require ('passport-local');



passport.use(
    new LocalStrategy (async function verify(username, password, cb) {
        let user = await User.findOne({phone: username})
        if(user){
            if (user.password === password){
                return cb(null,user);//verification successful
                }
        }   
         return cb(null,false);//verification failed
    })
);


passport.serializeUser(function(user, cb) {
    return cb (null,user);
});

passport.deserializeUser(function(user, cb) {
    return cb (null,user);
});

const checkLoggedIn = (req,res,next) =>{
    res.locals.loggedIn = false;
    if(req.isAuthenticated()){
        res.locals.loggedIn = true;
        next()
    }else {
        res.redirect('/login')
    }
}

router.use(passport.initialize());
router.use(passport.session());


//routes for login feature
router.get('/login', controller.login);
router.post('/login', passport.authenticate("local",{failureRedirect : '/login'}), controller.checkLogin);
router.get('/profile', controller.profile);
router.use(checkLoggedIn)



module.exports = router;