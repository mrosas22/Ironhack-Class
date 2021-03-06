const express  = require('express');
const router   = express.Router();

const Book      = require('../models/book-model')
const Author    = require('../models/author-model')

router.get('/create', (req, res, next) =>{
  Author.find()
    .then(theAuthors =>{
      console.log("theAuthors: ", theAuthors)
      res.render('books-views/new-book', {authorsFromDB: theAuthors});
    })
    .catch(err =>{ console.log('Error while displaying a form to create a new book: ', err)})
})

//create routes
router.post('/create', (req, res, next) =>{
  console.log(req.body)
  // const {theTitle, theDescription, theAuthor, theRating, theImage } = req.body
  Book.create({
    title: req.body.theTitle,
    description : req.body.theDescription,
    author: req.body.theAuthor,
    rating: req.body.theRating,
    image: req.body.theImage
  })
    .then(newBook => {
      // console.log('New Book created: ', newBook)
      res.redirect('/books')
    })
    .catch(err => console.log('Error while creating a new book: ', err))
})

//get all the books from the database
router.get('/', (req, res, next) => {
  Book.find()
    .then(allBooks => {
      res.render('books-views/books', {books : allBooks})
    })
    .catch(err => { console.log('Error while getting books: ', err)})

})

//get the details
router.get('/:bookId', (req, res, next) =>{
  const theBookId = req.params.bookId;
  Book.findById(theBookId).populate('author')
    .then(theBook => {
      console.log('the requested book is the book: ', theBook)
      // res.redirect(`/books/${theBookId}`)
      res.render('books-views/book-details', {book: theBook})
    })
    .catch(err => console.log('Error while getting the Book: ', err))
})

//Delete the book route
router.post('/:theBookId', (req, res, next)=>{
  Book.findByIdAndRemove(req.params.theBookId)
    .then(theBook => {
      // console.log('deleted book is: ', theBook)
      res.redirect('/books')
    })
    .catch(err => console.log('Error while deleting the Book: ', err))
})

//GET routes for edit the book
router.get('/:id/edit', (req, res, next) =>{
  Book.findById(req.params.id)
    .then(foundBook =>{
      console.log('The found book author ID is: ', foundBook.author)
      Author.find()
        .then(allAuthors =>{
          allAuthors.forEach(theAuthor =>{
            console.log('Id: ', theAuthor._id)
            //create additional key in the author object to differentiate the author that wrote this book from
            //all the other authors
            if(theAuthor._id.equals(foundBook.author)){
              theAuthor.isWriter = true;
            }
          })
          res.render('books-views/edit-book', {book: foundBook, authors: allAuthors});
        })
        .catch(error => ('Error while getting the authors: ', error))
    })
    .catch(err => ('Error while editing book: ', err))
  
})

//post route to update changes
router.post('/:theBookId/update', (req, res, next) =>{
  // console.log('Updates are: ', req.body)
  Book.findByIdAndUpdate(req.params.theBookId, {
    title: req.body.theTitle,
    description : req.body.theDescription,
    author: req.body.theAuthor,
    rating: req.body.theRating,
    image: req.body.theImage
  })
    .then(updatedBook => {
      // console.log('Is this updated: ', updatedBook)
      res.redirect(`/books/${req.params.theBookId}`)
    })
    .catch(err => console.log('Error while saving the updates in DB: ', ERR))
})

module.exports = router

