var express = require('express');
var router = express.Router();
var weatherController = require('../controllers/weather_controller');
var path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, "../../", 'public', 'index.html'));
});

router.get('/:lat/:lon', weatherController.weather_get);

router.get('/about', function (req, res, next) {
  res.render('about', { page: "about" });
});

module.exports = router;
