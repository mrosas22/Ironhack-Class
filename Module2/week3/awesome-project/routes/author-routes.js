const express  = require('express');
const router   = express.Router();

// const mongoose = require('mongoose');
// const Book     = require('../models/book');

// const dbName = 'library-project';
// mongoose.connect(`mongodb://localhost/${dbName}`);

router.get('/authors/new', (req, res, next) =>{
  res.render('author-views/new-author')
})

//<form action="/authors/create" method="post">
router.post('/authors/create', (req, res, next) =>{
  // console.log('data that user put in the form: ', req.body)
  res.render('create-author', {authors: req.body})
})

//we need to export router
module.exports = router;