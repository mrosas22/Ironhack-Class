const passport      = require('passport');
//passport-local is a repalcement for mongoStore
const LocalStrategy = require("passport-local").Strategy;
const bcrypt        = require('bcryptjs')

const User          = require('../models/user-model')

passport.serializeUser((user, cb) => {
 // null === no errors, all good
 cb(null, user._id); // <== save user ID into session
})

// deserializeUser => retrieve user's data from the database
// this function gets called everytime we request for a user (every time when we need req.user)
passport.deserializeUser((userId, cb) => {
 User.findById(userId)
 .then(user => {
   cb(null, user);
 })
 .catch( err => cb(err));
})

passport.use(new LocalStrategy({
 usernameField: 'email' // <== this step we take because we don't use username but email to register and login
 // if we use username we don't have to put this object: {usernameField: 'email'}
}, (email, password, next) => {
 User.findOne({ email: email }) // or simply "{ email }" since the placeholder is the same
 .then(userFromDB => {
   if(!userFromDB){
     return next(null, false, { message: 'Incorrect email!' })
   }
   if(!bcrypt.compareSync(password, userFromDB.password)){
     return next(null, false, { message: 'Incorrect password!' })
   }
   return next(null, userFromDB)
 })
 .catch( err => next(err))
}))

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