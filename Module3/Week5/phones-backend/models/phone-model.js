const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
    brand: {type: String, required:true},
    model: {type: String, required:true},
    price: {type: Number, required:true},
    image: {type: String, required:true},
    specs: [
        {type: String, minlength: 3}
    ]
},{
    timestamps: true
})


module.exports = mongoose.model('Phone', phoneSchema);