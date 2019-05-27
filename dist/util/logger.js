"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _winston = _interopRequireDefault(require("winston"));

var _path = _interopRequireDefault(require("path"));

var logDir = 'logs/';

var logger = _winston["default"].createLogger({
  level: 'info',
  format: _winston["default"].format.json(),
  transports: [new _winston["default"].transports.File({
    filename: _path["default"].join(logDir, 'error.log'),
    level: 'error'
  }), new _winston["default"].transports.File({
    filename: _path["default"].join(logDir, 'info.log'),
    level: 'info'
  }), new _winston["default"].transports.File({
    filename: _path["default"].join(logDir, 'debug.log'),
    level: 'debug'
  }), new _winston["default"].transports.File({
    filename: _path["default"].join(logDir, 'combined.log')
  })]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new _winston["default"].transports.Console({
    format: _winston["default"].format.simple()
  }));
}

var _default = logger;
exports["default"] = _default;