"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var path = require('path');

require('dotenv').config(); // Connect to the database


console.log(process.env.DB_URL);

_mongoose["default"].connect(process.env.DB_URL).then(function (db) {
  console.log("Connected to ".concat(db.connections[0].name));
})["catch"](function (err) {
  console.log(err);
}); //TODO