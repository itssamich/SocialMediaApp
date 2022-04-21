"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureRoutes = configureRoutes;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _users = require("./controllers/users");

var _pages = require("./controllers/pages");

var router = _express["default"].Router();

function isSignedIn(req) {
  return req.isAuthenticated && req.isAuthenticated();
}

function requireSignIn(req, res, next) {
  if (isSignedIn(req)) {
    next();
  } else {
    res.status(401).json("unauthorized request");
    res.end();
  }
}

function configureRoutes(app) {
  app.all('*', /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              app.locals.signedIn = isSignedIn(req);
              res.cookie("authenticated", app.locals.signedIn);
              next();

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
  /*****************************************************************************
   * Section 1: Rendered pages
   ****************************************************************************/
  // Rendered Pages

  router.get('/', _pages.indexPage);
  router.get('/home', requireSignIn, _pages.indexPage); //router.get('/post/:id', postPage)

  router.get('/signin', _users.signInPage);
  router.get('/signup', _users.signUpPage);
  router.get('/post/new', requireSignIn, _pages.newPost);
  /*****************************************************************************
   * Section 1: API endpoints
   ****************************************************************************/
  // TODO

  router.get('/api/post/all', _pages.homePageAPI);
  router.post('/api/post/new', _pages.newPostAPI);
  router.post('/api/users/signup', _users.signUserUpAPI);
  router.post('/api/users/signin', _users.signUserInAPI);
  router.put('/api/post/:id/like', _pages.updateLikes);
  router["delete"]('/api/post/:id', _pages.deletePost);
  router["delete"]('/api/users/signout', _users.signUserOutAPI);
  app.use('/', router);
}