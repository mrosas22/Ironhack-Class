const passport =require('passport');
//require the package at the top of the google strategy file
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user-model');

//configure our middleware changing the current configuration
passport.use(new GoogleStrategy({
  clientID: process.env.googleClientId,
  clientSecret: process.env.googleClientSecret,
  callbackURL: "/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleID: profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }
const newUser = new User({
      googleID: profile.id
    });
newUser.save((err) => {
      if (err) {
        return done(err);
      }
      done(null, newUser);
    });
  });
}));