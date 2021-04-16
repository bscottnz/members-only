var express = require('express');
const bcrypt = require('bcryptjs');
var router = express.Router();
const { body, validationResult, check } = require('express-validator');
const User = require('../models/user');

/* GET sign up form. */
router.get('/', function (req, res, next) {
  res.render('sign-up');
});

router.post('/', [
  // validate username and password
  body('username', 'Username required')
    .trim()
    .isLength({ min: 1 })
    .isAlphanumeric()
    .withMessage('Username may only contain letters and numbers')
    .escape(),
  body('password', 'Password required').trim().isLength({ min: 1 }).escape(),
  body('passwordConfirmation', 'Password confirmation required')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // check password confirmation
  check(
    'passwordConfirmation',
    'Password Confirmation field must have the same value as the password field'
  ).custom((value, { req }) => value === req.body.password),
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // res.send(errors.array());
      res.render('sign-up', { errors: errors.array() });
    } else {
      // res.send(`Username: ${req.body.username}\nPassword: ${req.body.password}`);

      // check if username allready exists
      User.findOne({ username: req.body.username }).exec((err, found_user) => {
        if (err) {
          return next(err);
        }
        if (found_user) {
          // user already exists, return to form and display error
          res.render('sign-up', { error: 'Username already taken' });
        } else {
          // user does not yet exist, create new user
          // first hash password for safe db storage
          bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) {
              return next(err);
            }
            const newUser = new User({
              username: req.body.username,
              password: hashedPassword,
              membership_status: 'none',
            });
            newUser.save(function (err) {
              if (err) {
                return next(err);
              }

              res.send(newUser);
            });
          });
        }
      });
    }
  },
]);

module.exports = router;
