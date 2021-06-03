var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var async = require('async');
var fs = require('fs');
const { body, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function (req, res, next) {
  async.series(
    [
      () => {
        return res.render('index', { page: "home" });
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
      return res.render('contactus', { page: "contactus" });
    }
  ]);
});

router.post('/contactus', (req, res, next) => {
  body('emailInput').trim().isEmail().withMessage("Email is cannot be left empty.").escape(),
    body('feedbackInput').isLength({ min: 10 }).withMessage("Feedback must be at least 10 characters long.").escape(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // There are errors
        res.render('contactus', { page: "contactus", errors: errors.array() });
      } else {
        res.render('contactus', { page: "contactus", success: true });
      }
    }
});

module.exports = router;
