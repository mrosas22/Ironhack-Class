require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session      = require("express-session");
// const flash        = require("connect-flash");<=== This will be moved to Passport-setup file
const bcrypt       = require("bcryptjs");
const passport     = require("passport");
const LocalStrategy = require("passport-local").Strategy;


//Import passport setup from config folder
// require('./config/passport-setup') <=== Not require anymore since we are importing the function from passport setup

const passportSetup = require('./config/passport/passport-setup')

mongoose
  .connect('mongodb://localhost/users-passport', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

//register partials
hbs.registerPartials(__dirname + '/views/partials');


// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

//handle sessions here:
app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));

//Must come after the session
passportSetup(app); //<===Pass app to have it available in passportSetup function


const index = require('./routes/index');
app.use('/', index);

app.use('/', require('./routes/auth-routes'));

app.use('/', require('./routes/user-routes'));

app.use('/', require('./routes/room-routes'));

module.exports = app;
