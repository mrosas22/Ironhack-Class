const express = require('express');
const router  = express.Router();

const Room = require('../models/room-model');
const User = require('../models/user-model');
const Review = require('../models/review-model');

const fileUploader = require('../config/upload-setup/cloudinary');

// GET route to display the form to create a room
router.get('/rooms/add', isLoggedIn, (req, res, next) => {
  res.render('room-pages/add-room');
});



// POST route to create the room -> has the image uploading example 🥳

                    //  <input type="file" name="imageUrl" id="">
//                                                  |
router.post('/create-room', fileUploader.single('imageUrl'),(req, res, next) => {
  const { name, description } = req.body;
  Room.create({
    name,
    description,
    imageUrl: req.file.secure_url,
    owner: req.user._id
  })
  .then( newRoom => {
    // console.log('room created: ', newRoom)
    res.redirect('/rooms');
  } )
  .catch( err => next(err) )
})

router.get('/rooms', (req, res, next) => {
  Room.find().populate('owner')
  .then(roomsFromDB => {
    roomsFromDB.forEach(oneRoom => {
      // if there's a user in a session:
      if(req.user && oneRoom.owner){
        if(oneRoom.owner.equals(req.user._id)){
          oneRoom.isOwner = true;
        }
      }
    })
    res.render('room-pages/room-list', { roomsFromDB })
  })
})


//GET route to display details of rooms
router.get('/rooms/:id', (req, res, next) =>{
  const roomId = req.params.id;
  Room.findById(roomId).populate('owner')
    .then(theRoom => {
      console.log('the current user id: ', req.user)
      console.log('the room owner id is: ', theRoom.owner)
      if(req.user && theRoom.owner){
        if(theRoom.owner.equals(req.user._id)){
          theRoom.isOwner = true;
        }
      }
      res.render('room-pages/room-details', {theRoom})
    })
    .catch(err => console.log('Error while getting the Book: ', err))
})

//Create Reviews
// router.post('/rooms/reviews/add', (req, res, next) =>{
//   const 
//   Room.findById(req.params.id, (err, room) =>{
//     if (err) throw new Error(err);
//     const newPost = {
//       user: req.user._id,
//       comment: req.body.comment
//     };
//     Review.create(newPost, (err, post) =>{
//       if (err){
//         res.redirect('/rooms');
//         throw new Error (err)
//       }
//       room.reviews.push(newPost);
//       room.save((err) =>{
//         return res.redirect('/rooms')
//       })
//     })
//   })
// })

//Delete Route
//localhost:3000/rooms/5c621e706840861a4ad8f2b9/delete?
router.post('/rooms/:theRoomId/delete', (req, res, next) =>{
  Room.findById(req.params.theRoomId)
    .then(theRoom => {
      
      res.redirect('/rooms')
    })
    .catch(err => console.log('Error while deleting the Room: ', err))
})


//GET routes to edit rooms
//localhost:3000/rooms/5c61c60a9348bc08c738c7d0/edit
router.get('/rooms/:id/edit', (req, res, next) =>{
  Room.findById(req.params.id)
    .then(foundRoom =>{
          res.render('room-pages/edit-room', {room: foundRoom});
    })
    .catch(err => ('Error while editing room: ', err))
})

//post route to update changes
//localhost:3000/rooms/5c61c60a9348bc08c738c7d0/update
router.post('/rooms/:id/update', fileUploader.single('imageUrl'), (req, res, next) =>{
  // console.log('Updates are: ', req.body)
  Room.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description : req.body.description,
    imageUrl: req.file.secure_url,
    owner: req.user._id
  })
    .then(updatedRoom => {
      console.log('Is this updated: ', updatedRoom)
      res.redirect(`/rooms/${req.params.id}`)
      // res.redirect('/rooms')
    })
    .catch(err => console.log('Error while saving the updates in DB: ', err))
})

// this is the function we use to make sure the route and the functionality is 
// available only if we have user in the session
function isLoggedIn(req, res, next){
  if(req.user){
    next();
  } else  {
    res.redirect('/login');
  }

}

//Get the details


module.exports = router;
