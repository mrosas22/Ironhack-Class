const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  //The ref option is what tells Mongoose which model to use during population
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]//<===in our case the Review model
})

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;