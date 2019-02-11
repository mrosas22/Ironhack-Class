const passport =require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy; //<=== passport-local as a replacement for mongoStore

const User = require('../models/user-model');
//define three methods that Passport needs to work.
//1. Define which strategy we are going to use, its configuration that includes error control.
passport.use(new LocalStrategy ((email, password, next) => {
    User.findOne({ username })
      .then(userFromDb => {
        if(!userFromDb){
          return next(null, false, { message: 'Incorrect username!' })
        }
        if(userFromDb.password){
          if(!bcrypt.compareSync(password, userFromDb.password)){
            return next(null, false, { message: 'Incorrect password!' })
          }
        } else {
          return next(null, false, { message: 'This email is used for your social login.' })
        }
        return next(null, userFromDb)
      })
      .catch( err => next(err))
    }))
  