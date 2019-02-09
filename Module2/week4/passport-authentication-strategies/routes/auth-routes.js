const express   = require('express');
const router    = express.Router();

//Import User model
const User = require('../models/user-model');

//Bcrypt to encrypt passwords
const bcrypt = require('bcryptjs')
const bcryptSalt = 10;

//require the package passport to use it in our login routes
const passport = require('passport');

//Signup routes
router.get('/signup', (req, res, next) =>{
  res.render('auth/signup');
})

router.post('/signup', (req, res, next) =>{
  const username = req.body.username;
  const password = req.body.password;

  if(username == '' || password ==''){
    // res.render('auth/signup', {message: 'Indicate username and password'});
    res.render('auth/signup', {'message': req.flash('error', 'Fill out all fields')}) //<===redefine to send errors using flash
    return;
  }

  User.findOne({username})
    .then(user =>{
      if(user !== null){//<===user not equal value or type to null(absence of any value)
        // res.render('auth/signup', {message: 'The username already exists'});
        req.flash('error', 'The username already exists')//<===redefine to send errors using flash
        return;
      }
      const salt     = bcrypt.genSaltSync(bcryptSalt);//<===This specifies the cost of execution of the algorithm
      const hassPass = bcrypt.hashSync(password, salt)//<===The password to encrypt and variable to make the algorithm slower

      const newUser = new User ({username, password: hassPass});//<== Create new user with encrypted password

      newUser.save((err) =>{
        if (err) {
          // res.render('auth/signup', {message: 'The username already exists'});
          req.flash('error', 'Auto login does not work. Please login manually' )
          res.redirect('/login')
          return;
        }else{
          res.redirect('/');
        }
      })
    })
    .catch(error => {next(error)})
})

//login routes
router.get('/login', (req, res, next) =>{
  // res.render('auth/login'); ===> Before Flash configuration
  //redefine the GET method to send the errors to our view:
  res.render('auth/login', {'message': req.flash('error') }); //req.flash has been defined as a default in the app in line 78 app.js
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true, //===>This is what will allow us to use flash messages in our application
  passReqToCallback: true
}));

//logout routes
router.post('/logout', (req, res) =>{
  req.logout();//<=== Passport exposes a logout() function on req object that can be called from any route handler
  res.redirect('/login')
})



module.exports= router;