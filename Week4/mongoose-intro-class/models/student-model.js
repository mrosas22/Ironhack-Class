const mongoose = require('mongoose');
//we use Schema class given by mongoose
const Schema = mongoose.Schema;
//based on Schema we create a blueprint for our students collection
const studentSchema = new Schema({
    name: {type: String, require: true},
    image: {type: String, default: 'images/avatar.png'},
    course: {type: String},
    startedMonth: {type: String},
    startedYear: {type: Number},
    projects: {type: [ String]},
    previousExperience: Boolean,
    created: {type: Date, default: Date.now}
})
//connect the schema with the model we are exporting
const Student = mongoose.model('Student', studentSchema);
//we export the model to make it accesible in other files
module.exports = Student;