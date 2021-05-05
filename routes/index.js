var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var async = require('async');

/* GET home page. */
router.get('/', function (req, res, next) {
  var zipcode = 90210;
  if (req.cookies.zipcode) {
    zipcode = req.cookies.zipcode;
  }
  if (req.query.zipcode) {
    zipcode = req.query.zipcode;
    res.cookie('zipcode', zipcode, { httpOnly: true, encode: String });
  }
  async.series(
    [
      (callback) => {
        let url = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zipcode + ',us&units=imperial&appid=f0e9be06b2eace17712b103c03cdc6d4';
        try {
          fetch(url)
            .then(res => res.json())
            .then((json) => {
              return callback(null, json);
            });
        } catch (e) {
          return callback(err, response);
        }
      }
    ],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.render('index', { error: err });
      }
      if (results) {
        if (results[0].cod === "404") {
          return res.render('index', { message: "The Zipcode of " + zipcode + " is not valid! Please enter a valid USA Zipcode." })
        }
        return res.render('index', { weather: results[0] });
      }
    }
  );

});

module.exports = router;
