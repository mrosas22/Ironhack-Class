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
const FbStrategy    = require('passport-facebook').Strategy;

//Import passport setup from config folder
require('./config/passport-setup')

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

//we have to initialize passport and passport session
app.use(passport.initialize());
app.use(passport.session()); //===> connect passport to the session

//activate flash to handle error messages
app.use(flash());

//Aunthentication with Facebook as a provider
passport.use(new FbStrategy({
  clientID: "your Facebook client id here",
  clientSecret: "your Facebook client secret here",
  callbackURL: "/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ facebookID: profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }
const newUser = new User({
      facebookID: profile.id
    });
newUser.save((err) => {
      if (err) {
        return done(err);
      }
      done(null, newUser);
    });
  });
}));

// Make currentUser available in all HBS whenever we have user in the session
app.use((req, res, next) =>{
  // we have added the req parameter to the callback function that will be executed within the LocalStrategy
  res.locals.messages = req.flash();
  if(req.user){
    res.locals.currentUser = req.user;
  }
  next();
})

const index = require('./routes/index');
app.use('/', index);
//mount our authentication routes at the / path. 
app.use('/', require('./routes/auth-routes'))
//mount our user's private routes at the / path
app.use('/', require('./routes/user-routes'));


module.exports = app;
