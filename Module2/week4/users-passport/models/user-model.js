const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  email :   {type: String, required: true},
  password: {type: String}, 
  fullName: {type: String},
  slackID:  {type: String},
  googleID: {type: String},
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]//<===in our case the Review model
  },{
    timestamps: true
})

const User = mongoose.model('User', userSchema);

module.exports = User;