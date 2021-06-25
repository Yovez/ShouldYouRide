var async = require('async');
const { body, validationResult } = require('express-validator');
var nodemailer = require('nodemailer');
var User = require('../models/UserSchema');
var cookieParser = require('cookie-parser');

exports.getUserLogin = (req, res, next) => {
    return res.render('login', { email: req.cookies.email });
}

exports.postUserLogin = [
    body('username').trim().isEmpty().withMessage("Invalid email provided.").isEmail().withMessage("Invalid email provided").normalizeEmail(),
    body('password').isEmpty().withMessage("Invalid password provided, please try again.").escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('login', { email: req.body.email, password: req.body.password, errors: errors.mapped() });
        }
        if (User.findOne({ email: req.body.email }).then((value) => {
            if (value) {
                if (value.get("password") === req.body.password) {
                    res.render('index', {});
                }
            }
        }));
    }
];

exports.getRegister = (req, res, next) => {
    return res.render('login');
}

exports.getUserProfile = (req, res, next) => {
    async.series([
        (callback) => {
            if (req.cookies.username) {
                callback(null, req.cookies.username);
            }
            else {
                callback(null, null);
            }
        }
    ],
        (err, results) => {
            if (results[0]) {
                var user = User.findOne({ username: results[0][0] });
                return res.render('userSettings', { user: user });
            } else {
                return res.redirect("/login");
            }
        }
    );
};

function uniqueID() {
    return Math.floor(Math.random() * Date.now())
}