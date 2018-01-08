const express = require('express');
const router = express.Router();
const config = require('../../config/database'); // Models for Database connection
const csrf = require('csurf'); //csrfprotection
const passport = require('passport');
const user = require('../../models/user'); // login 


var csrfProtection = csrf();

router.use(csrfProtection); 




router.get('/test-page', isLogginedIn, (req, res, next) => {
    res.render('oth/test-page');
});

router.get('/logout', isLogginedIn, (req, res, next) => {
    req.logout();
    res.redirect('/');
})

router.use('/', notLogginedIn, function(req,res,next) {
    next();
})

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
    successRedirect: '/admin/login',
    failureRedirect: '/admin/signup',
    failureFlash: true
}));


router.get('/login', (req, res, next) => {
    var messages = req.flash('error');
    res.render('oth/login', {csrfToken: req.csrfToken(), mess: messages, hasErrors: messages.length > 0});
});

router.post('/login', passport.authenticate('local.signin', {
    successRedirect: '/admin/test-page',
    failureRedirect: '/admin/login',
    failureFlash: true
}));


module.exports = router;

function isLogginedIn(req, res, next ){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}

function notLogginedIn(req, res, next ){
    if (!req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}