const mongoose = require('mongoose');
const config = require('../config/database');
const bcrypt = require('bcrypt-nodejs');

// test Schema
const userSchema = mongoose.Schema({     
    uTest:{ type: String },
    pTest:{type: String },  
    emlTest:{type: String },  
    country:{type: String }  
});


// yo encryption muzi vai ra xainwa masala mardinxy yeslai la
userSchema.methods.encryptPassword = function(pTest) {
  var salt = bcrypt.genSaltSync(5);
  return bcrypt.hashSync(pTest, salt, null);
};

userSchema.methods.validPassword = function(pTest) {
  return bcrypt.compareSync(pTest, this.pTest);
};

const user = module.exports = mongoose.model('user', userSchema);
