var express = require('express');
var router = express.Router();
const User = require('../models/user');

router.get('/', function (req, res, next) {
  res.render('upgrade');
});

router.post('/', function (req, res, next) {
  // res.send(req.user);
  User.findOneAndUpdate(
    { username: req.user.username },
    { $set: { membership_status: 'gold' } },
    { new: true },
    (err, result) => {
      res.render('index', { currentUser: result });
    }
  );
});

module.exports = router;
