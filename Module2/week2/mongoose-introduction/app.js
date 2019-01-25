//we must require mongoose
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/exampleApp');

//First data model using constructor functions from JavaScript
const Cat = mongoose.model('Cat', {name: String});

function addNewCat(catName){
    //creating new instance
    const kitty = new Cat ({name: catName});
    //use save method that comes from prototype Cat which is a mongoose model
    kitty.save(function(err){
        if(err){
            console.log (err);
        }else {
            console.log(`meow! ${catName} SAVED.`);
        }
    });
}

function showCats(){
    console.log('All the Cats');
    Cat.find({}, (err, cats) =>{
        //cats is an array of cat instances
        cats.forEach((cat) => {
            console.log('--> cat: ', cat.name);
        })
    });
}

function addTenCats(){
    for(let i =0; i <10; i++){
        addNewCat(`Ironhacker ${i}`);
    }
}

addTenCats();

/* We have to wait for our cats to save before displaying them
 Remember, it's async */
 setTimeout(showCats, 1500);



