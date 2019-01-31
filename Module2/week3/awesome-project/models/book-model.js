const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

//Use Schema to set our blueprint for each instance in this collection
const bookSchema = new Schema({
  title: String,
  description: String,
  //reference authors inside the book model
  author: {type: Schema.ObjectId, ref: "Author"} ,
  rating: Number,
  image: String
}, {
  timestamps: {
    timestamps: true
  }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
