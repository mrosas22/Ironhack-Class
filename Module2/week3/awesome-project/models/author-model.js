const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

//Use Schema to set our blueprint for each instance in this collection
const authorSchema = new Schema({
  firstName: String,
  lastName : String,
  nationality : String,
  birthdate : Date,
  image_url: {type : String, default : 'https://media.istockphoto.com/vectors/developer-thin-line-icon-avatar-of-man-with-program-code-modern-vector-id1055452034'}
}, {
  //Keep record on when document is created or updated
  timestamps: true
});

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;