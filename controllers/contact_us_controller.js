var async = require('async');
const { body, validationResult } = require('express-validator');

exports.contactUs_get = (req, res, next) => {
    res.render('contactus', { page: "contactus" });
}

exports.contactUs_post = [
    body('email').trim().isEmail().withMessage("Email cannot be empty.").trim(),
    body('feedback').isLength({ min: 10 }).withMessage("Feedback must be at least 10 characters long.").escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // There are errors
            res.render('contactus', { page: "contactus", email: req.body.email, feedback: req.body.feedback, errors: errors.mapped() });
        } else {
            res.render('contactus', { page: "contactus", success: true });
        }
    }
];