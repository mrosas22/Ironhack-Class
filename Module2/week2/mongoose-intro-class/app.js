const express  = require('express');
const mongoose = require('mongoose');
const hbs      = require('hbs')
//create application
const app      = express();

//import model to make it available in this file
const Student = require('./models/student-model')

//create database connection
//                                Here you name your DB
//                                         |
mongoose.connect('mongodb://localhost/studentBook')

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


//Create operation
// Student.create({
//     name: "Ana",
//     course: 'UX',
//     startedMonth: 'January',
//     startedYear: 2018,
//     projects: ['x', 'y', 'z' ],
//     previousExperience: false
// })
//     .then( newStudent => { console.log('Record was successfully created: ', newStudent)})
//     .catch(err => { console.log('An error occurred when creating record: ', err)})


//Use save method to create new instances
// const camiloInfo = new Student ({
//     name: "Camilo",
//     course: 'Web Dev',
//     startedMonth: 'October',
//     startedYear: 2018,
//     projects: ['game' ],
//     previousExperience: true

// })
// camiloInfo.save()
//     .then( newStudentInfo => { console.log('Record was successfully added: ', newStudentInfo)})
//     .catch(err => { console.log('An error occurred when adding new record: ', err)})

//Retrieve Data
// Student.find()
//     .then( allStudentsFromDB => { 
//         allStudentsFromDB.forEach(student =>{
//             console.log(student.name)
//         })
//     })
//     .catch(err => { console.log('An error occurred when searching for all students: ', err)})

//Student by ID only gives me one record in the form of object
// Student.findById('5c4a436728261d1b3559724c')
//     .then( theStudent => { console.log('Student is: ', theStudent)})
//     .catch(err => { console.log('An error occurred when searching by ID: ', err)})

//Use findOne to filter one result based on searched property
// Student.findOne({course: 'Web Dev'})
//     .then( theStudent => { console.log('Student is: ', theStudent.name)})
//     .catch(err => { console.log('An error occurred when searching with property: ', err)})

//Update
// Student.findByIdAndUpdate('5c4a436728261d1b3559724c', {name: 'Paula'})
//     .then(updatedStudent =>{
//         console.log('The updated student is: ', updatedStudent)
//     })
//     .catch(err =>{
//         console.log('An error occurred when updating document: ', err)
//     })

//Deleting entry with the findByIdAdndRemove method()
// Student.findByIdAndRemove('5c4a6344149fd2242c57ac29')
//     .then(removeStudent =>{
//         console.log(`Student with id: ${removeStudent._id} is removed from the DB`)
//     })
//     .catch(err =>{
//         console.log('An error occurred when removing the entry: ', err)
//     })

//Deleting entry with the findByIdAndDelete method()
// Student.findByIdAndDelete('5c4a436728261d1b3559724c')
//     .then(removeDeleted =>{
//         console.log(`Student with id: ${removeDeleted._id} is removed from the DB`)
//     })
//     .catch(err =>{
//         console.log('An error occurred when removing the entry: ', err)
//     })

app.listen(3000, () =>{ console.log('Listening on port 3000')})