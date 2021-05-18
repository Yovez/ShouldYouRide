var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var async = require('async');
var fs = require('fs');
const { Navigator } = require('node-navigator');

/* GET home page. */
router.get('/', function (req, res, next) {
  async.series(
    [
      (callback) => {
        var lat = 0;
        var lon = 0;
        if (req.query.lat) {
          lat = req.query.lat
        }
        if (req.query.lon) {
          lon = req.query.lon;
        }
        if (lat !== 0 || lon !== 0) {
          const nav = new Navigator();
          nav.geolocation.getCurrentPosition((success, error) => {
            console.log('tried to get location')
            if (error) console.log(error);
            if (success) {
              lat = success.latitude;
              lon = success.longitude;
            }
          });
        }
        console.log("Lat: " + lat + " - Lon: " + lon);
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
        return res.render('index', { error: err });
      }
      if (results) {
        if (!results[0]) {
          return res.render('index', { message: "Please enable location to use this website!" });
        }
        return res.render('index', { weather: results[0] });
      } else {
        return res.render('index', { message: "Please enable location to use this website!" });
      }
    }
  );

});

module.exports = router;
