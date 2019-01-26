const express = require('express');
const app     = express();
const hbs     = require('hbs');
// ...
const bodyParser = require('body-parser');
// ...


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
// app.post('/login', (req, res) => {
//     res.send('You\'ve logged in!');
// });
//====> You've logged in!

//The Request Body
app.use(bodyParser.urlencoded({ extended: true }));

// app.post('/login', (req, res) => {
//     res.send(req.body);
// });
 
app.post('/login', (req, res) => {
    let email    = req.body.email;
    let password = req.body.password;
    
    res.send(`Email: ${email}, Password: ${password}`);
});

//Middleware
app.get('/test', (req, res) => {
    let mySecret = req.secretValue;
    res.send(mySecret);
});
  

// ...
app.use(myFakeMiddleware)
// ...
function myFakeMiddleware(req, _, next){
    console.log("myFakeMiddleware was called!");
    req.secretValue = "swordfish";
    next();
}
  
  
  
app.listen(3000, () =>  console.log('Listening on port 3000'))