// Require packages in our passport-setup
const passport      = require('passport');
const flash         = require("connect-flash");
// Import User model
const User          = require('../models/user-model');

require('./local-strategy')
require('./google-strategy')
//2. User serialize => define which data is kept in the session
passport.serializeUser((user, cb) =>{
  //null === no errors, all good
 //   | 
  cb(null, user._id);// <===save user ID into session
})
//3. deserializeUser => retrieve user's data from the database
passport.deserializeUser((userId, cb) =>{
  User.findById(userId) //===> this function gets called everytime we request for a user (req.user)
    .then(user =>{
      cb(null, user);
    })
    .catch(err => cb(err))
})

//create a passportSetup function to handle passport session management
function passportBasicSetup(app){//<=== This app comes from app.js
  //passport super power is here:
  app.use(passport.initialize()) //===>"fires"
  app.use(passport.session()); //===> connect passport to the session

  //to activate flash messages
  app.use(flash())

  app.use((req, res, next) =>{
    res.locals.messages = req.flash(); 
    if(req.user){
      res.locals.currentUser = req.user;//===> Make currentUser available in all HBS whenever we have user in the session
    }
    next();
  })

}

module.exports = passportBasicSetup;

