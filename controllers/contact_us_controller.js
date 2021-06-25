var async = require('async');
const { body, validationResult } = require('express-validator');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'andrewbean15@gmail.com',
        pass: 'cleoizzybella1134'
    }
});

exports.contactUs_get = (req, res, next) => {
    res.render('contactus', { page: "contactus" });
}

exports.contactUs_post = [
    body('email').trim().isEmail().withMessage("Email cannot be empty.").trim(),
    body('feedback').not().isLength({ min: 10 }).withMessage("Feedback must be at least 10 characters long.").trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are errors
            res.render('contactus', { page: "contactus", email: req.body.email, feedback: req.body.feedback, errors: errors.mapped() });
        } else {
            transporter.sendMail({
                from: 'andrewbean15@gmail.com',
                to: 'andrewbean34@gmail.com',
                subject: 'Feedback for ShouldYouRide?',
                html: `<h1>Feedback for Should You Ride?</h1><br /><h2>From ${req.body.email}</h2><br /><h3>${req.body.feedback}</h3>`
            }).then((value) => {
                if (value)
                    res.render('contactus', { page: "contactus", success: true });
            }, (reason) => {
                if (reason)
                    res.render('contactus', {page: "contactus", sendMailFail: reason})
            });
        }
    }
];