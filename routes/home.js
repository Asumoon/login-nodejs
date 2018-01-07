const express = require('express');
const router = express.Router();
const config = require('../config/database'); // Models for Database connection
const csrf = require('csurf'); //csrfprotection
const passport = require('passport');
const user = require('../models/user'); // login 


var csrfProtection = csrf();

router.use(csrfProtection); 

router.post('/new-user', (req, res, next) => {
    userko = new user()
    userko.uTest = req.body.uTest;
    userko.pTest = req.body.pTest;
    userko.emlTest = req.body.emlTest;
    userko.country = req.body.country;

    userko.save( function(err){
        if(err){
            res.send('error for registering user')
        } else {
            res.send('Successfully registered user .....  now you can register')           
        }
    })
});

router.get('/signup', (req, res, next) => {
    var messages = req.flash('error');
    res.render('oth/signup', {csrfToken: req.csrfToken(), mess: messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/login',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/', (req, res, next) => {
    res.render('home');
});

router.get('/login', (req, res, next) => {
    var messages = req.flash('error');
    res.render('oth/login', {csrfToken: req.csrfToken(), mess: messages, hasErrors: messages.length > 0});
});

router.post('/login', passport.authenticate('local.signin', {
    successRedirect: '/test-page',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/test-page', (req, res, next) => {
    res.render('oth/test-page');
});


module.exports = router;