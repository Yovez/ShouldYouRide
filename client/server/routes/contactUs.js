var express = require('express');
var router = express.Router();
var contactUsController = require('../controllers/contact_us_controller');

router.get('/contactus', contactUsController.contactUs_get);

router.post('/contactus', contactUsController.contactUs_post);

module.exports = router;