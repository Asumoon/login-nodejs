const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const session = require('express-session'); // To Store something New like csrfToken 
const passport = require('passport');  // passport for the user auth, sign in, management etc
const flash = require('connect-flash');   // to show for the flash messages
const validator = require('express-validator');
const config = require('./config/database');


mongoose.Promise = global.Promise;
// Connect To Database  
mongoose.connect(config.database);

// On Connection Successful
mongoose.connection.on('connected',() =>{
    console.log('Connected to database ' +config.database);
 });

  // On Error Connection 
 mongoose.connection.on('error',(err) =>{
    console.log('Error to database connection ' +err);
});

// Models & Routes initialization to index page
const app = express();
require('./config/passport'); // passport importing
app.use(require('express-promise')());

// Set Static Public folder (SABAI CHANGE GARNWA BAKI XA HAI SALA TANAB GARXA YESLA SECURITY KO LAGI )
app.use(express.static(path.join(__dirname, 'public')));
app.use("/tether", express.static(__dirname + "/node_modules/tether/dist/"));
app.use("/popper", express.static(__dirname + "/node_modules/popper.js/dist/"));

// Routes initial Initialization
const home_page = require('./routes/home'); // Index-Page

// Port Number to Start 
const port = 2200;

app.use(cors());

// Body parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
// middleware for the login system (csurf vayac important xa hai) ra yo session la save garnwa kam lagxa every time  khyalgar hai
app.use(session({secret: 'mysmallsecret', resave: false, saveUninitialized: false}));
app.use(flash());
app.use(passport.initialize()); // passport initialization matra
app.use(passport.session()); // passport with session store session ma store garnwa lai

// view engine setup i.e HBS
app.set('views',path.join(__dirname,'views'));
app.engine(".hbs", exphbs({ defaultLayout: "mainlayout", extname: ".hbs"}));
app.set("view engine", ".hbs");

// Index Page Route
app.use('/',home_page); 

// Server starting
app.listen(port, () => {
    console.log('server started on part '+port);
});

