//This model file also requires declaration of mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating new Schema
const userSchema = new Schema ({
    username : {type : String},
    password : {type : String},
    job : {type : String}
}, {
    timestamps: true
});

//Creating the mongoose model using the Schema created prior
const User = mongoose.model('User', userSchema);
//Export module to use Schema
module.exports = User;







