"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Post = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var postSchema = new Schema({
  body: {
    type: String,
    required: true,
    trim: false,
    unique: false
  },
  author: {
    type: String,
    required: true,
    unique: false
  },
  postedAt: {
    type: Date,
    "default": Date.now
  },
  likes: {
    type: Number,
    "default": 1
  },
  comments: [{
    msg: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    postedAt: {
      type: Date,
      "default": Date.now
    }
  }]
});

var Post = _mongoose["default"].model("Post", postSchema);

exports.Post = Post;