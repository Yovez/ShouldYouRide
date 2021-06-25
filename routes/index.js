var express = require('express');
var router = express.Router();
var weatherController = require('../controllers/weather_controller');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { page: "home" });
});

router.get('/:lat/:lon', weatherController.weather_get);

module.exports = router;
