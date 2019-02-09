const express     = require('express');
const router      = express.Router();

// Import User model
const User = require("../models/user-model");

// require connect-ensure-login to generate protected routes with Passport
const ensureLogin = require('connect-ensure-login');

// const flash       = require("connect-flash");

//                                The ensureLoggedIn() function redirects the user 
//                                         | by default to the /login page if he is not logged in
router.get('/private', ensureLogin.ensureLoggedIn(), (req, res) =>{
  res.render('user/private')
})

router.get('/public', ensureLogin.ensureLoggedIn(), (req, res, next) =>{
  if(!req.user){
    req.flash('error', 'You have to be logged in to access Public Page')
    res.redirect('/login')
  }
  res.render('user/public')
})

module.exports = router;