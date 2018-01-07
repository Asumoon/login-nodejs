const passport = require('passport');
const user = require('../models/user'); // login 
const LocalStrategy = require('passport-local').Strategy;

// note
// sertalizeuser for passport helps to  how to store user in a session 

passport.serializeUser(function(usern, done) {
  done(null, usern.id);
});

passport.deserializeUser(function(id, done) {
  user.findById(id, function(err, usern) {
    done(err, usern);
  });
});

// passport encryption and save garnwa ko lagi ho yooo 
// successfully vayo yo chaine 
passport.use('local.signup', new LocalStrategy({
  usernameField: 'emlTest',
  passwordField: 'pTest',
  passReqToCallback:true
 }, function(req, emlTest, pTest, done) {
  user.findOne({'emlTest': emlTest}, function(err, usern){
    if (err) {
      return done(err);
    }
    if (usern) {
      return done(null, false, {message: 'email is already used'});
    }
    var newUser = new user();
    newUser.emlTest = emlTest;
    newUser.pTest = newUser.encryptPassword(pTest);
    newUser.save(function(err, result) {
      if (err){
        return done(err);
      }
      return done(null, newUser);
    });
  });
}));



// compare password yo muzi balla balla vayo sala 

passport.use('local.signin', new LocalStrategy({
  usernameField: 'emlTest',
  passwordField: 'pTest',
  passReqToCallback:true
 }, function(req, emlTest, pTest, done ){
  user.findOne({'emlTest': emlTest}, function(err, usern){
    if (err) {
      return done(err);
    }
    if (!usern) {
      return done(null, false, {message: 'User is not found'});
    }
    if (!usern.validPassword(pTest)){
      return done(null, false, {message: 'wrong password found'});      
    }
    return done(null, usern);
  });
}))