var express = require('express');
var router = express.Router();
const Post = require('../models/post');

/* GET home page. */
router.get('/', function (req, res, next) {
  Post.find({})
    .populate('author')
    .exec((err, list_posts) => {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render('index', { posts: list_posts });
    });
});

module.exports = router;
