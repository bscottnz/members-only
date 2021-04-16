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
router.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
  })
);

module.exports = router;
