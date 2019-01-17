const express = require('express');
const app = express();

// creates an absolute path pointing to a folder called "views"
app.set('views', __dirname + '/views');
//tell Express app that HBS will be in charge of rendering the HTML
app.set('view engine', 'hbs');

app.get('/', (req, res, next) => {
  let data = {
    name: "JavaScript",
    lastName: "Ninja",
    address: {
      street: "Your score",
      number: 87
    },
    cities: ["Miami", "Madrid", "Barcelona", "Paris", "México", "Berlín"]
  };
  //The res.render() method can take an additional parameter that will contain a JavaScript object
  res.render('index', data);
});

//second route
app.get('/about', (req, res, next) => {
  let data = {
    name: "Ironhacker",
    lastName: "Rocking it!",
    address: "Your heart",
    cities: ["Miami", "Madrid", "Barcelona", "Paris", "México", "Berlín"]
  };
  res.render('about', data);
});



app.listen(3000);


