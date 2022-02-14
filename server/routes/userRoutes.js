const router = require('express').Router();

const controller = require('../controllers/loginController')
const { initialize } = require('passport');
const passport = require('passport');
const localStrategy = require ('passport-local');

router.use(passport.initialize());
router.use(passport.session());

passport.use(
    new localStrategy(function verify(username, password, cb) {
        const user = {};
        return cb(null,user);
    })
);

passport.serializeUser(function(user, cb) {
    return cb (null,user);
});

passport.deserializeUser(function(user, cb) {
    return cb (null,user);
});

//routes for login feature
router.get('/login', controller.login);
router.post('/login', controller.checkLogin);
router.get('/profile', controller.profile);


module.exports = router;