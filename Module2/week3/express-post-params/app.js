const express = require('express');
const app     = express();
const hbs     = require('hbs');
//make the POST request body info readable by installing bodyParser
const bodyParser = require('body-parser');
app.use(myFakeMiddleware)

//The Request Body using bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

//Static Configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
//========== A Form with GET ===========
//Step 1 - Display a form
app.get('/get-user-info', (req, res) => {
    res.render('user-info-form');
    // console.log(res)
});

//Step 2 - Use the Query Params
app.get('/display-user-info', (req, res) => {
    let name      = req.query.name;
    let age       = req.query.age;
    let superhero = req.query.superhero;
  res.send(`
      Your name is ${name}
      Your age is ${age}
      Your favorite superhero is ${superhero}
    `)
});
//====> http://localhost:3000/display-user-info?name=Miller&age=34&superhero=Spiderman

//========== A Form with POST ===========
//Step 1 - Display a Form
app.get('/login', (req, res) => {
    res.render('login')
});

//Step 2 - POST route
app.get('/login1', (req, res) => {
    res.render('login')
});

app.post('/login1', (req, res) => {
    res.send('You\'ve logged in!');
});
//====> You've logged in!


// app.post('/login', (req, res) => {
//     res.send(req.body);
// });

//req contains information about the request entered into the form.
// app.post('/login', (req, res) => {
//     const email    = req.body.email;
//     const password = req.body.password;
//     res.send(`Email: ${email}, Password: ${password}`);
// });

//Exercise
app.post('/login', (req, res) => {
    // What ES6 feature could we use to clean the code above
    const {email, password} = req.body;
    if (email === "ironhacker@gmail.com" && password === "password"){
        // render "Welcome"
        res.send('Welcome!');
    } else {
        // render go away
        res.send('go Away!');
    }
});


//Middleware

function myFakeMiddleware(req, _, next){
    console.log("myFakeMiddleware was called!");
    req.secretValue = "swordfish";
    next();
}
//Second Middleware
app.use(myFakeMiddleware1)
// ...
function myFakeMiddleware1(req, _, next){
    console.log("myFakeMiddleware1 was called!");
    req.secretValue = "alan";
    next();
}

//Middleware test
app.get('/test', (req, res) => {
    let mySecret = req.secretValue;
    res.send(mySecret);
});

  
//Add 404 page at the end for all of the url not matching my listed routes
// app.get('/:404', (req, res) => {
//     res.render(200)
// });  

// catch 404 and render a not-found.hbs template
app.use((req, res, next) => {
    cres.status(404);
    res.render('not-found');
})

app.listen(3000, () =>  console.log('Listening on port 3000'))