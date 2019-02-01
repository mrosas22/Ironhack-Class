const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
//Build Author Schema
const authorSchema = new Schema({
  firstName: String,
  lastName: String,
  nationality: String,
  birthday: Date,
  pictureUrl: String
});
//Make Author a mongoose model
const Author = mongoose.model("Author", authorSchema);

//Export Author Module to make it available in other files 
module.exports = Author;