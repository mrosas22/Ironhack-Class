const express  = require('express');
const router   = express.Router();

const Author   = require('../models/author-model')

router.get('/authors/new', (req, res, next) =>{
  res.render('author-views/new-author')
})

//<form action="/authors/create" method="post">
router.post('/authors/create', (req, res, next) =>{
  // console.log('data that user put in the form: ', req.body)
  // res.render('create-author', {authors: req.body})
  Author.create(req.body)
    .then(newAuthor => {
      // console.log("New author created: ", newAuthor);
      res.redirect('authors-view')
    })
    .catch(err => console.log("Error while creating a new author: ", err));
})

//Get all the authors from the database
router.get('/authors', (req, res, next) =>{
  Author.find()
    .then(allAuthors => {
      res.render('author-views/authors-view', {authors : allAuthors})
    })
    .catch(err => { console.log('Error while getting authors: ', err)})
})
//we need to export router
module.exports = router;