const express = require('express');
const router = express.Router();

//Import passport
const passport     = require("passport");

// BCrypt to encrypt passwords
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;


//Import user model
const User = require('../models/user-model')

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});


//Post request ====> http://localhost:3000/signup
router.post('/signup', (req,res, next) =>{
  const userEmail= req.body.email;
  const userPassword = req.body.password;
  const userFullName = req.body.fullName
  if( userEmail == ""|| userPassword == "" || userFullName == ""){
    req.flash ('error', ' Please fill all the fields.')
    res.render('auth/signup')
  }
  User.findOne({'email': userEmail})
    .then(foundUser =>{
      if(foundUser !== null){
        req.flash('error', "There's already an user with the email. Please try again")
        return;
      }
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(userPassword, salt)
      User.create({
        email: userEmail,
        password: hashPass,
        fullName: userFullName
      })
        .then(user =>{
          // console.log('user was created: ', userCreated)
          req.login(user, (err)=>{
            if(err){
              //===>req.flash.error = 'Error message'
              req.flash('error', 'Auto login does not work. Please login manually')
              res.redirect('/private');
              return;
            }
            res.redirect('/')
          })
        })
        .catch(err => next(err));//closing User.create()
    })
    .catch(err => next(err));

 
})

router.get('/login', (req, res, next) =>{
  res.render('auth/login')
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/private",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.post('/logout', (req, res, next) =>{
  req.logout();//<==this logout method comes from passport
  res.redirect('/login')
})

module.exports = router;
