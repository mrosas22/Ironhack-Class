// Require packages in our passport-setup
const passport      = require('passport');
const LocalStrategy = require("passport-local").Strategy;
const bcrypt        = require('bcryptjs');
// Import User model
const User          = require('../models/user-model');


//define three methods that Passport needs to work.
//1. Define which strategy we are going to use, its configuration that includes error control.
const localStrategy = require('passport-local').Strategy; //<=== passport-local as a replacement for mongoStore
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

passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));

// passport.serializeUser((user, cb) => {
//   cb(null, user._id);
// });

// passport.deserializeUser((id, cb) => {
//   User.findById(id, (err, user) => {
//     if (err) { return cb(err); }
//     cb(null, user);
//   });
// });

// passport.use(new LocalStrategy((username, password, next) => {
//   User.findOne({ username }, (err, user) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return next(null, false, { message: "Incorrect username" });
//     }
//     if (!bcrypt.compareSync(password, user.password)) {
//       return next(null, false, { message: "Incorrect password" });
//     }

//     return next(null, user);
//   });
// }));