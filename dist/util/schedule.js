"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = void 0;

var _jobs = require("./jobs");

var run = function run() {
  (0, _jobs.scheduleSearchVideoPlaylist)();
  (0, _jobs.scheduleSearchVideoChannel)();
};

exports.run = run;