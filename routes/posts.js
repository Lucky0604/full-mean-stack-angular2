var express = require('express');
var router = express.Router();
var PostModel = require('../models/posts');

var checkLogin = require('../middlewares/check').checkLogin;

// GET /posts 所有用户或者特定用户的文章页 eg:GET /posts?author=xxx
router.get('/', function(req, res, next) {
  res.send(req.flash());
})

// POST /posts 发表一篇文章
router.post('/', checkLogin, function(req, res, next) {
  // res.send(req.flash());
  var author = req.session.user._id;
  var title = req.body.title;
  var content = req.body.content;

  var post = {
    author: author,
    title: title,
    content: content,
    pv: 0
  };

  PostModel.create(post)
    .then(function(result) {
      // 此post是插入mongodb后的值，包含_id
      post = result.ops[0];
      res.redirect(`/posts/${post._id}`);
    })
    .catch(next);
})

// GET /posts/create 发表文章页
router.get('/create', checkLogin, function(req, res, next) {
  // res.send(req.flash());
  res.render('create.html');
})

// GET /posts/:postId 单独一篇文章
router.get('/:postId', function(req, res, next) {
  res.send(req.flash());
})

// GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit', checkLogin, function(req, res, next) {
  res.send(req.flash());
})

// POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit', checkLogin, function(req, res, next) {
  res.send(req.flash());
})

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin, function(req, res, next) {
  res.send(req.flash());
}) 

// POST /posts/:postId/comment 创建一条留言
router.post('/:postId/comment', checkLogin, function(req, res, next) {
  res.send(req.flash());
})

// GET /posts/:postId/comment/:commentId/remove 删除一条留言
router.get('/:postId/comment/:commentId/remove', checkLogin, function(req, res, next) {
  res.send(req.flash());
})

module.exports = router;