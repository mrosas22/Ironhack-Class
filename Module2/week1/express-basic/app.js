//require all the installed packages
const express = require('express');
const app = express();

// Make everything inside of public/ available
app.use(express.static('public'));

//First Route
app.get('/', (request, response, next) => {
  console.log(request);
  response.sendFile(__dirname + '/views/home.html');
});

//Second route
app.get('/cat',(request, response, next) =>{
  response.sendFile(__dirname + '/views/cat.html');
})

// Server Started
app.listen(3000, () => {
    console.log('My first app listening on port 3000!')
});
  

