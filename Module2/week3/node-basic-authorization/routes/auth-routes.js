// routes/auth.js
const express = require("express");
const router = express.Router();
// User model
const User = require("../models/user");
// BCrypt to encrypt passwords
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;
//Password strength measurement
var zxcvbn = require('zxcvbn');
zxcvbn('Tr0ub4dour&3');

//Render signup form
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});
  
router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
		res.render("auth/signup", {
			errorMessage: "Indicate a username and a password to sign up"
		});
	return;
	}
	User.findOne({ "username": username })
	  .then(user => {
      if (user !== null) {
        res.render("auth/signup", {
          errorMessage: "The username already exists!"
        });
        return;
      }
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      const newUser = User({
        username,
        password: hashPass
      });
      newUser.save()
        .then(user => {
          res.redirect("/");
        })
	      .catch(error => {
          next(error);
        })
    .catch(err => console.log( 'Error while checking if user exists: ', err ) ); // <== closes User.findOne()
    })
  })

//Display login form
router.get('/login', (req, res, next) =>{
  res.render('auth/login')
})

//Add POST method to handle the form request
router.post('/login', (req, res, next) =>{
  const theUsername = req.body.username;
  const thePassword = req.body.password;
  //Add validation to make sure the user types username and password
  if( theUsername == "" || thePassword == ""){
    res.render("auth/login", {
      errorMessage: "Please enter both, username and password to sign in."
    });
    //add return so I don't have to create a big else statement
    return;
  }
  //Search for the user to make sure it isn't in the DataBase already
  User.findOne({"username": theUsername})
    .then(user =>{
      if(!user){
        res.render("auth/login", {
          errorMessage: "the username doesn't exist."
        })
        return;
      }
      if (bcrypt.compareSync(thePassword, user.password)){
        //save the login in the session
        req.session.currentUser = user;
        res.redirect('/');
      } else {
        res.render('auth/login', { errorMessage: 'Incorrect password! 🤭' });
      }
    })
    .catch(error =>{
      next(error)
    })
})

//Logout route
router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    // can't access session here
    res.redirect("/login");
  });
});

	
module.exports = router;



