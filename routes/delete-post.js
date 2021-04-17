var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Post = require('../models/post');

// this should be a post, but i need to re write the link button to a form submit.
// ill do it for my real project
router.get('/:id', (req, res, next) => {
  Post.findByIdAndRemove(req.params.id, function deletePost(err) {
    if (err) {
      return next(err);
    }
    //success - got to home page
    res.redirect('/');
  });
});

module.exports = router;
