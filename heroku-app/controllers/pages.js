"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateLikes = exports.postPage = exports.newPostAPI = exports.newPost = exports.indexPage = exports.homePageAPI = exports.deletePost = void 0;

var _posts = require("../models/posts");

//GET /
var indexPage = function indexPage(req, res, next) {
  res.render('index');
}; //GET /home


exports.indexPage = indexPage;

var homePageAPI = function homePageAPI(req, res, next) {
  _posts.Post.find({}).exec(function (err, post) {
    if (err) {
      res.json({
        success: false,
        message: "Query Failed"
      });
    } else {
      res.write(JSON.stringify(post));
      res.end();
    }
  });
}; //GET /api/posts/:id


exports.homePageAPI = homePageAPI;

var postPage = function postPage(req, res, next) {
  _posts.Post.findById(req.params.id).exec(function (err, post) {
    if (err) {
      res.json({
        success: false,
        message: "Query Failed"
      });
    } else {
      res.write(JSON.stringify(post));
      res.end();
    }
  });
};

exports.postPage = postPage;

var newPost = function newPost(req, res, next) {
  res.render('newpost');
}; //POST /api/posts/new


exports.newPost = newPost;

var newPostAPI = function newPostAPI(req, res, next) {
  var post = new _posts.Post(req.body);
  post.save(function (err) {
    if (err) {
      res.json({
        success: false,
        message: "Could not add post!"
      });
      res.end();
    } else {
      res.end();
    }
  });
}; //PUT /api/posts/:id/like


exports.newPostAPI = newPostAPI;

var updateLikes = function updateLikes(req, res, next) {
  _posts.Post.findOne({
    _id: req.params.id
  }).exec(function (err, post) {
    if (err) {
      res.json({
        success: false,
        message: "unable to update"
      });
      res.end();
    } else {
      post.likes = post.likes + 1;
      post.save(function (err) {
        if (err) {
          res.json({
            success: false,
            message: "unable to update"
          });
          res.end();
        } else {
          res.end();
        }
      });
    }
  });
}; //DELETE /api/posts/:id


exports.updateLikes = updateLikes;

var deletePost = function deletePost(req, res, next) {
  _posts.Post.findByIdAndDelete(req.params.id, function (err) {
    if (err) {
      res.json({
        success: false,
        message: "post deletion failed"
      });
      res.end();
    } else {
      res.end();
    }
  });
};

exports.deletePost = deletePost;