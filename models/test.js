const mongoose = require('mongoose');
const config = require('../config/database');

// test Schema
const testSchema = mongoose.Schema({
    test:{
      type: String,
    }  
});

const Test = module.exports = mongoose.model('test', testSchema);
