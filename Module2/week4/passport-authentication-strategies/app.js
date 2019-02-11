require('dotenv').config();

const bodyParser    = require('body-parser');
const cookieParser  = require('cookie-parser');
const express       = require('express');
const favicon       = require('serve-favicon');
const hbs           = require('hbs');
const mongoose      = require('mongoose');
const logger        = require('morgan');
const path          = require('path');
//packages to store the session in mongo and keep our users logged in
const session       = require("express-session");
//allow us to use username and password to login
const passport      = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const ensureLogin   = require('connect-ensure-login');
//connect-flash is used to manage flash errors in Passport
const flash         = require("connect-flash");

//Import passport setup from config folder
const passportSetup = require('./config/passport-setup')

mongoose
  .connect('mongodb://localhost/passport-authentication-strategies', {useNewUrlParser: true})
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



// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

//we have to configure the express-session
app.use(session({
  secret: "our-passport-local-strategy-app",//<===indicating which secret key it will use to be generated
  resave: true,
  saveUninitialized: true
}));

//Must come after the session
passportSetup(app); //<===Pass app to have it available in passportSetup function


const index = require('./routes/index');
app.use('/', index);
//mount our authentication routes at the / path. 
app.use('/', require('./routes/auth-routes'))
//mount our user's private routes at the / path
app.use('/', require('./routes/user-routes'));


module.exports = app;
