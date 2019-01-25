// require all the packages you install 🎯

const express = require('express');
const app = express();


// package that allows templating and dynamic views
const hbs = require('hbs');

// in case you want to change the name of views folder, do it like this:
// app.set('views', __dirname + '/someOtherName');

// sets hbs as default view engine
app.set('view engine', 'hbs');


// in order to use the partials you have to register them!
hbs.registerPartials(__dirname + '/views/partials');


// routes:

app.get('/', (req, res, next) => {

    const randomIndex = Math.floor(Math.random() * students.length);

    // here is the object that is going to be sent to the hbs file 
    const data = {
        oneRandomStudent: students[randomIndex]
    }


    // you don't have to say views/home because views is default folder
    //                data is the name of the object we created above
    //                  ^
    //                  |
    res.render('home', data);
});

app.get('/blog', (req, res, next) => {
    // you don't have to say views/home because views is default folder
    // in render put the name of the file ('secondPage)
                            // allStudents is the variable name that is used in hbs
                            //               students is the name of the existing array
    res.render('blog', { allStudents:students });
});

app.get('/third', (req, res, next) => {
    
    res.render('third', { allStudents:students });
});



app.listen(3000, ()=> console.log("Listening on 3000 🏆"));




// imaginary DB:

const students = [
    {
        name:"Will",
        class: "Web Dev",
        cohort: "Oct 2018",
        favoriteTopic:"Express"
    },
    {
        name:"Miller",
        class: "Web Dev",
        cohort: "Jan 2019",
        favoriteTopic:""
    },
    {
        name:"Ana",
        class: "UX",
        cohort: "Jan 2018",
        favoriteTopic:"User Persona"
    }
]