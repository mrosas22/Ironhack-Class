const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

//Use Schema to set our blueprint for each instance in this collection
const bookSchema = new Schema({
  title: String,
  author: ,
  description: String,
  image: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;