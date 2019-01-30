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

//Route to add records in our Database
router.get('/books/add', (req, res, next) =>{
  res.render('book-add')
})


//Get the data and add to our Mongo database
router.post('/books/add', (req, res, next) => {
  const { name, author, description, rating } = req.body;
  const newBook = new Book({ name, author, description, rating})
  newBook.save()
    .then((book) => {
      res.redirect('/books');
    })
    .catch((error) => {
      console.log(error);
    })
});

//we need an edit form, where the user will be able to modify the info of each book
router.get('/books/edit', (req, res, next) => {
  Book.findOne({_id: req.query.book_id})
    .then((book) => {
      res.render("book-edit", {book});
    })
    .catch((error) => {
      console.log(error);
    })
});

//Create the route with a POST method so we can get the info of the book
router.post('/books/edit', (req, res, next) => {
  const {name, author, description, rating} = req.body;
  Book.update({_id: req.body.book_id}, { $set : {name, author, description, rating}}, { new: true })
    .then((book) =>{
      res.redirect('/books');
    })
    .catch((error) =>{
      console.log(error);
    })
})

module.exports = router;


