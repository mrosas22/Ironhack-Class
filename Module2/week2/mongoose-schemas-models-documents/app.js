const mongoose = require ('mongoose');
const Schema   = mongoose.Schema;
//Assign the export module from User.js to const User
const User    = require ('./models/User')

//connect to DB
mongoose.connect('mongodb://localhost/mySchemaApp')
    .then(() =>{
        console.log('Connected to Mongo!');
    }).catch( err => {
        console.log('Error connecting to mongo', err);
    });

// -------------------- CREATE --------------------
// Based on already defined User model, create a user Paula ('Computer Engineer')

User.create({
    name: 'Paula', 
    password: 'ironhack2018',
    job: 'Computer Engineer'
})
    .then(newUser => {
        console.log(' New user successfully created: ', newUser)
    })
    .catch(err =>{
        console.log('Error while creating new instance: ', err)
    })

// -------------------- USE SAVE METHOD --------------------
const camiloInfo = new User ({
    name: 'Camilo', 
    password: 'ironhack2018',
    job: 'System Administrator'
})

camiloInfo.save()
    .then(newStudentInfo =>{
        console.log('New Student: ', newStudentInfo)
    })
    .catch(err => {
        console.log('An error happened: ', err)
    })

// -------------------- READ --------------------
User.find({})
    .then( allUsersFromDB =>{
        allUsersFromDB.forEach(user =>{
            console.log(user.username)
        })

    })
    .catch( err =>{
        console.log('An error ocurred while looping all the users from DB: ', err)
    })

User.findById('5c491defbe76013ec2ed4e48')
    .then(theStudent =>{
        console.log('Student is: ', theStudent.username)
    })
    .catch(err =>{
        console.log('An error occurred when finding by ID: ', err);
    })
// -------------------- UPDATE --------------------
// Find the user with id '' and update its job and salary
User.findById('5c491ae2eb1ac73c89f0b07f')
    .then(user => {
        user.job = 'SQL Administrator';
        user.salary += 40000;
        return user.save(); // Update the user '42' and return a promise
    })
    .then(user => { console.log('The user job and salary was updated: ' + user )})
    .catch(err => { console.log('An error occurred while updating user by ID:', err) });

// -------------------- DELETE --------------------
User.findByIdAndRemove('5c491ca3c66b113dd4e52050')
    .then( userDel => {
        console.log('The duplicate document was deleted from DB: ', userDel)
    })
    .catch(err =>{
        console.log('An error occurred when deleting duplicate: ', err)
    })

User.findOneAndDelete('5c4919245848e43c06a85e70')
    .then(userRem =>{
        console.log('The duplicate document was deleted from DB: ', userRem)
    })
    .catch(err =>{
        console.log('An error occurred when deleting duplicate: ', err)
    })