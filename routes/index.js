var express = require('express');
var router = express.Router();
var contactUsController = require('../controllers/contact_us_controller');
var weatherController = require('../controllers/weather_controller');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { page: "home" });
});

router.get('/:lat/:lon', weatherController.weather_get);

router.get('/contactus', contactUsController.contactUs_get);

router.post('/contactus', contactUsController.contactUs_post);

module.exports = router;
