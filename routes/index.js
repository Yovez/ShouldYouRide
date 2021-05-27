var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var async = require('async');
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
  async.series(
    [
      () => {
        return res.render('index');
      }
    ]
  );

});

router.get('/:lat/:lon', (req, res) => {
  async.series(
    [
      (callback) => {
        var lat = req.params.lat;
        var lon = req.params.lon;
        let url = 'http://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=f0e9be06b2eace17712b103c03cdc6d4';
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
        return res.render('weather', { error: err });
      }
      if (results) {
        if (!results[0]) {
          return res.render('weather', { message: "Please enable location to use this website!" });
        }
        return res.render('weather', { weather: results[0] });
      } else {
        return res.render('weather', { message: "Please enable location to use this website!" });
      }
    }
  );
});

router.get('/contactus', (req, res) => {
  async.series([
    () => {
      //return res.render('contactus');
    }
  ]);
});

module.exports = router;
