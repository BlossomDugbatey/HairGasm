const router = require('express').Router();
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