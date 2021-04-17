var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Post = require('../models/post');

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
      Post.find({})
        .populate('author')
        .exec((err, list_posts) => {
          if (err) {
            return next(err);
          }
          //Successful, so render
          res.render('index', { posts: list_posts, currentUser: result });
        });
    }
  );
});

module.exports = router;
