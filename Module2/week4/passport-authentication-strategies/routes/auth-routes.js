const express   = require('express');
const router    = express.Router();

//Import User model
const User = require('../models/user-model');

//Bcrypt to encrypt passwords
const bcrypt = require('bcryptjs')
const bcryptSalt = 10;

router.get('/signup', (req, res, next) =>{
  res.render('auth/signup');
})

router.post('/signup', (req, res, next) =>{
  const username = req.body.username;
  const password = req.body.password;

  if(username == '' || password ==''){
    res.render('auth/signup', {message: 'Indicate username and password'});
    return;
  }

  User.findOne({username})
    .then(user =>{
      if(user !== null){//<===user not equal value or type to null(absence of any value)
        res.render('auth/signup', {message: 'The username already exists'});
        return;
      }
      const salt     = bcrypt.genSaltSync(bcryptSalt);//<===This specifies the cost of execution of the algorithm
      const hassPass = bcrypt.hashSync(password, salt)//<===The password to encrypt and variable to make the algorithm slower

      const newUser = new User ({username, password: hassPass});//<== Create new user with encrypted password

      newUser.save((err) =>{
        if (err) {
          res.render('auth/signup', {message: 'The username already exists'});
          return;
        }else{
          res.redirect('/');
        }
      })
    })
    .catch(error => {next(error)})
})


module.exports= router;