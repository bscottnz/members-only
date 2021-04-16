var express = require('express');
const bcrypt = require('bcryptjs');
var router = express.Router();
const { body, validationResult, check } = require('express-validator');
const User = require('../models/user');
const passport = require('passport');

/* GET sign up form. */
router.get('/', function (req, res, next) {
  res.render('sign-in');
});

// sign in to form
// router.post(
//   '/',
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/sign-in',
//     failureFlash: true,
//   })
// );

router.post('/', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render('sign-in', { error: 'Wrong username or password!!' });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

module.exports = router;
