const express     = require('express');
const router      = express.Router();
// Import User model
const User        = require("../models/user-model");

// require connect-ensure-login to generate protected routes with Passport
const ensureLogin = require('connect-ensure-login');

const flash       = require("connect-flash");

//                                The ensureLoggedIn() function redirects the user 
//                                         | by default to the /login page if he is not logged in
router.get('/private', ensureLogin.ensureLoggedIn(), (req, res) =>{
  console.log('req.user is: ', req.user.role)
  res.render('user/private', {user: req.user})
})

//==========PENDING============
//http://localhost:3000/private
router.post('/private', (req, res, next)=>{
  console.log('Create post form to save user role to admin')
})



router.get('/public', ensureLogin.ensureLoggedIn(), (req, res, next) =>{
  if(!req.user){
    req.flash('error', 'You have to be logged in to access Public Page')
    res.redirect('/login')
  }
  res.render('user/public')
})

//check for a particular role in the same fashion as the ensureAuthenticated function
router.get('/admin', checkRoles('ADMIN'), (req, res) => {
  res.render('user/admin', {user: req.user});
});

//function that will keep role accessible for the middleware
function checkRoles(role) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.role === role) {
      return next();
    } else {
      res.redirect('/login')
    }
  }
}




module.exports = router;