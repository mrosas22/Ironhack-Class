const express = require('express');
const router  = express.Router();
//Importing model
const Book      = require('../models/book')
const Author    = require('../models/author')
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
  if (!/^[0-9a-fA-F]{24}$/.test(bookId)) { 
    return res.status(404).render('not-found');
  }
  Book.findOne({'_id': bookId})
    //Population is the process of automatically replacing the specified paths in the document
    .populate('author')
    .then(book => {
      if (!book) {
          return res.status(404).render('not-found');
      }
      res.render("book-detail", { book })
    })
    .catch(next)
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

//Creating authors routes
router.get('/authors/add', (req, res, next) => {
  res.render("author-add")
});

router.post('/authors/add', (req, res, next) => {
  const { name, lastName, nationality, birthday, pictureUrl } = req.body;
  const newAuthor = new Author({ name, lastName, nationality, birthday, pictureUrl})
  newAuthor.save()
  .then((book) => {
    res.redirect('/books')
  })
  .catch((error) => {
    console.log(error)
  })
});


module.exports = router;


