var express = require('express');
var router = express.Router();
var userController = require('../controllers/user_controller');

router.get('/user', userController.getUserProfile);
router.get('/login', userController.getUserLogin);
router.get('/register', userController.getRegister);

module.exports = router;
