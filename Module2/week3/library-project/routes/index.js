const express = require('express');
const router  = express.Router();
//Importing model
const Book    = require('../models/book')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

//List documents
router.get('/books', (req, res, next) => {
  Book.find()
    .then(books => {
      res.render("books", { books: books });
    })
    .catch(error => {
      console.log(error)
    })
});

//Route by ID
router.get('/book/:id', (req, res, next) => {
  let bookId = req.params.id;
  Book.findOne({'_id': bookId})
    .then(book => {
      res.render("book-detail", { book })
    })
    .catch(error => {
      console.log(error)
    })
});



module.exports = router;


