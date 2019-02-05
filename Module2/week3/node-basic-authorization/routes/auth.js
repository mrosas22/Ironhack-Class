const express = require("express");
const router = express.Router();
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

const User           = require("../models/user");
// BCrypt to encrypt passwords
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const salt     = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);
const newUser  = User({
    username,
    password: hashPass
  });
newUser.save()
  .then(user => {
    if (username === "" || password === "") {
      res.render("auth/signup", {
        errorMessage: "Indicate a username and a password to sign up"
      });
      return;
    } else{
      res.redirect("/");
    }    
  })
  .catch(error => {
    console.log(error);
  })
});

User.findOne({ "username": username })
.then(user => {
  if (user !== null) {
      res.render("auth/signup", {
        errorMessage: "The username already exists!"
      });
      return;
    }
const salt     = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
const newUser = User({
      username,
      password: hashPass
    });
newUser.save()
    .then(user => {
      res.redirect("/");
    })
})
.catch(error => {
    next(error);
})


module.exports = router;

newUser.save()
  .then(user => {
    res.redirect("/");
  })
  .catch(error => {
    next(error);
  })

