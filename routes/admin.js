var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Post = require('../models/post');

router.post('/', (req, res, next) => {
  if (req.body.password === 'qwerty12345') {
    User.findOneAndUpdate(
      { username: req.user.username },
      { $set: { membership_status: 'admin' } },
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
  } else {
    res.render('upgrade', { message: 'WRONG PASSW0RDD!!!' });
  }
});

module.exports = router;
