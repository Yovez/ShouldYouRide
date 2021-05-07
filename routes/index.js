var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var async = require('async');
const { Navigator } = require('node-navigator');

/* GET home page. */
router.get('/', function (req, res, next) {
  var lat = 0, lon = 0;
  if (req.cookies.lat) {
    lat = req.cookies.lat;
  }
  if (req.cookies.lon) {
    lon = req.cookies.lon;
  }
  if (req.query.lat) {
    lat = req.query.lat;
    res.cookie('lat', lat, { httpOnly: true, encode: String });
  }
  if (req.query.lon) {
    lon = req.query.lon;
    res.cookie('lon', lon, { httpOnly: true, encode: String });
  }
  const nav = new Navigator();
  if (nav.geolocation) {
    nav.geolocation.getCurrentPosition((success, error) => {
      if (error) {
        console.log(error);
        //return res.render('index', { message: "Please enable location to use this website!", error: error });
      }
      if (lat === 0)
        lat = success.latitude;
      if (lon === 0)
        lon = success.longitude;
    });
  }
  console.log("Lat: " + lat + " - Lon: " + lon);
  async.series(
    [
      (callback) => {
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
