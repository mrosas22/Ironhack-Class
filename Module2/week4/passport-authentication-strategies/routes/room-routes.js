const express = require('express');
const router  = express.Router();

const Room    = require('../models/room-model');
const User    = require('../models/user-model');

//finding all the rooms that have the owner attribute match the authenticated user id
router.get('/rooms', ensureAuthenticated, (req, res, next) => {
  Room.find({owner: req.user._id}, (err, myRooms) => {
      if (err) { return next(err); }
      res.render('rooms/room-list', { rooms: myRooms });
  });
});

//make sure all new products will have an owner
router.post('/rooms', ensureAuthenticated, (req, res, next) => {
  const newRoom = new Room ({
    name:  req.body.name,
    desc:  req.body.desc,
    owner: req.user._id   // <-- we add the user ID
  });
  newRoom.save ((err) => {
    if (err) { return next(err); }
    else {
      res.redirect('/rooms');
    }
  })
});

// router.get('/private', ensureAuthenticated, (req, res) => {
//   res.render('private', {user: req.user});
// });

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login')
  }
}

module.exports= router;