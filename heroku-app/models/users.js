"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var passportLocalMongoose = require('passport-local-mongoose');

var Schema = _mongoose["default"].Schema;
var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: String
});
userSchema.plugin(passportLocalMongoose);

var User = _mongoose["default"].model("User", userSchema);

exports.User = User;