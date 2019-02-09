const express = require('express');
const router = express.Router();

// User model
const User = require("../models/user-model");

router.get('/private', (req, res, next) =>{
  if(!req.user){
    req.flash('error', 'You have to be logged in ')
    res.redirect('/login')
  }
  res.render('user-pages/profile-page')
})


router.get('/public', (req, res, next) =>{
  res.render('user-pages/public-page')
})


module.exports = router;