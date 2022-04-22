"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUserUpAPI = exports.signUserOutAPI = exports.signUserInAPI = exports.signUpPage = exports.signInPage = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _users = require("../models/users");

require("express-session");

// GET /signin
var signInPage = function signInPage(req, res, next) {
  res.render('signin');
}; // GET /signup


exports.signInPage = signInPage;

var signUpPage = function signUpPage(req, res, next) {
  res.render('signup');
}; // POST /api/users/signup


exports.signUpPage = signUpPage;

var signUserUpAPI = function signUserUpAPI(req, res, next) {
  var user = new _users.User({
    username: req.body.username,
    email: req.body.email
  });

  _users.User.register(user, req.body.password, function (err, user) {
    if (err) {
      res.json({
        success: false,
        message: "Account could not be created",
        err: err
      });
    } else {
      res.json({
        success: true,
        message: "Account created successfully"
      });
    }

    res.end();
  });
}; // POST /api/users/signin


exports.signUserUpAPI = signUserUpAPI;

var signUserInAPI = function signUserInAPI(req, res, next) {
  _passport["default"].authenticate('local', function (err, user, info) {
    if (err) res.status(500);else if (!user) res.status(404);
    req.logIn(user, function (err) {
      if (err) res.status(401);else res.status(200);
    });
    res.end();
  })(req, res, next);
}; // DELETE /api/users/signout


exports.signUserInAPI = signUserInAPI;

var signUserOutAPI = function signUserOutAPI(req, res, next) {
  req.logout();
  req.session.destroy();
  res.end();
};

exports.signUserOutAPI = signUserOutAPI;