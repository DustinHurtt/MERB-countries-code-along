var express = require('express');
var router = express.Router();

const Country =  require('../models/Country');
const User = require('../models/User');

/* GET users listing. */
router.get('/add-country/:userId', (req, res, next) => {
  
    Country.findOne({alpha2Code: req.body.alpha2Code})
        .then((foundCountry) => {
            if (foundCountry) {

                User.findByIdAndUpdate(req.params.userId, {
                    $push: {countries_visited: foundCountry._id}
                },
                {new: true})
                .then((updatedUser) => {
                    res.json(updatedUser)
                })
                .catch((err) => {
                    console.log(err)
                })

            } else {

                let newCountry = {
                    name: req.body.name,
                    capital: req.body.capital,
                    alpha2Code: req.body.alpha2Code,
                    flag: req.body.flag,
                    region: req.body.region,
                    languages: req.body.languages,
                    currency: req.body.currency
                }
                Country.create({newCountry})
                    .then((createdCountry) => {
                        User.findByIdAndUpdate(req.params.userId, {
                            $push: {countries_visited: createdCountry._id}
                        },
                        {new: true})
                    })
                    .then((updatedUser) => {
                        res.json(updatedUser)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        })

});

module.exports = router;