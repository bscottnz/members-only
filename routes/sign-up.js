var express = require('express');
var router = express.Router();

/* GET sign up form. */
router.get('/', function (req, res, next) {
  res.render('sign-up');
});

module.exports = router;
