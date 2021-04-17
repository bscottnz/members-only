var express = require('express');
var router = express.Router();
const User = require('../models/user');
const Post = require('../models/post');

router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render('create-post');
  } else {
    res.send(`<h1>You must be signed in to view this page</h1>`);
  }
});

router.post('/', (req, res, next) => {
  console.log(req.user);
  console.log(req.body);
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.user,
    timestamp: new Date(),
  });
  newPost.save(function (err) {
    if (err) {
      return next(err);
    }

    res.redirect('/');
  });
});

module.exports = router;
