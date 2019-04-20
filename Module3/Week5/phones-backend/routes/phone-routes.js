const express = require('express');
const router = express.Router();

const Phone = require('../models/phone-model');

router.post('/phones', (req, res, next) =>{
    const {brand, model, price, image, spec} = req.body;
    if(brand == '' || model == '' || price === '', image == '', specs == ''){
        // send error JSON if any of the fields is empty or password doesn't contain a number
        res.status(401).json({ message: "All fields need to be filled." })
        return;
      }
    Phone.create({brand, model, price, image, spec})
        .then(phoneDoc => res.json(phoneDoc))
        .catch(err => next(err));
});

//get the list of all phones from DB
router.get('/phones', (req,res, next) =>{
    Phone.find()
    .sort({createAt: -1})
    .limit(10)
    .then(phonesFromDB => res.json(phonesFromDB))
    .catch(err => next(err))
})

module.exports = router;
