const express = require('express');
const app     = express();
const hbs     = require('hbs');

//Static configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

//first Route
// app.get('/', (req, res, next) =>{
//     console.log(req)
//     res.send(200)//====> OK
// })

//Route params
app.get('/users/:username', (req, res, next) => {
    //====> http://localhost:3000/users/ironhack
    res.send(req.params);
    //====> {"username":"ironhack"}
})


//More Route Params
app.get('/users/:username/books/:bookId', (req, res, next) => {
    //====> http://localhost:3000/users/ironhack/books/8989
    res.send(req.params)
    //====> {"username":"ironhack","bookId":"8989"}
})
  
//Query String

app.get('/:repository', (req, res, next) => {
    //====> http://localhost:3000/search?city=Barcelona
    console.log(req.query);
    //====> console => { "city" : "Barcelona" } 
    res.send(200)//====> Browser => OK 
}) 

//More Query String
app.get('/:repository', (req, res, next) =>{
    //http://localhost:3000/search?city=Barcelona&start-date=2018-01-18
    console.log(req.query);
    //====> { "city" : "Barcelona", "start-date" : "2018-01-18"} 
})


// Query String from Forms
app.get('/', (req, res, next) => {
    res.render('index');
})

app.get('/search', (req, res, next) =>{
    //information from form render when calling 'index'
    //====> localhost:3000/search?city=Cartagena&start-date=2019-05-29&end-date=2019-06-02
    res.send(req.query)
    //====> {"city":"Cartagena","start-date":"2019-05-29","end-date":"2019-06-02"}
})

//Cheat Table
app.get('/products/:id', (req, res, next) =>{
    //http://localhost:3000/products/12345?show=reviews
    res.send(req.params)
    console.log(req.params)
    //====> { id: '12345' }
    console.log(req.query)
    //====> { show: 'reviews' }
})


app.listen(3000, () =>  console.log('Listening on port 3000'))

