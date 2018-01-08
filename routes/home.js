const express = require('express');
const router = express.Router();
const config = require('../config/database'); // Models for Database connection

router.get('/', (req, res, next) => {
    res.render('home');
});


module.exports = router;