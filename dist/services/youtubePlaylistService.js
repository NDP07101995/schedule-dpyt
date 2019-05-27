"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertPlaylistItem = exports.insertPlaylist = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _youtubeService = require("./youtubeService");

var _request = _interopRequireDefault(require("request"));

var _constant = require("../util/constant");

/**
 * 
 * @param {object} token 
 * @param {string} title 
 * @param {string} hl 
 * @param {string} description 
 * @param {string[]} tags 
 */
var insertPlaylist = function insertPlaylist(token, title, hl, description, tags) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee(resolve, reject) {
      var accessToken, data, snippet;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _youtubeService.getToken)(token);

            case 3:
              accessToken = _context.sent;
              data = {};
              snippet = {};
              snippet.title = title;
              snippet.defaultLanguage = hl;

              if (description) {
                snippet.description = description;
              }

              if (tags) {
                snippet.tags = tags;
              }

              data.snippet = snippet;
              data.status = 'public';
              (0, _request["default"])({
                uri: _constant.PLAYLIST_YOUTUBE_API_URL,
                method: 'POST',
                qs: {
                  part: 'snippet,status'
                },
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': "".concat(token.token_type, " ").concat(accessToken)
                },
                body: data,
                json: true
              }, function (err, _, body) {
                if (err) {
                  reject(err);
                }

                resolve(body);
              });
              _context.next = 18;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](0);
              reject(_context.t0);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 15]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
/**
 * 
 * @param {object} token 
 * @param {string} playlistId 
 * @param {string} videoId 
 * @param {number} position 
 * @param {string} title 
 * @param {string} description 
 */


exports.insertPlaylist = insertPlaylist;

var insertPlaylistItem = function insertPlaylistItem(token, playlistId, videoId, position, title, description) {
  return new Promise(
  /*#__PURE__*/
  function () {
    var _ref2 = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee2(resolve, reject) {
      var accessToken, data, snippet, resourceId;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return (0, _youtubeService.getToken)(token);

            case 3:
              accessToken = _context2.sent;
              data = {};
              snippet = {};
              resourceId = {};
              resourceId.videoId = videoId;
              resourceId.kind = 'youtube#video';
              snippet.playlistId = playlistId;
              snippet.resourceId = resourceId;
              snippet.position = position;

              if (title) {
                snippet.title = title;
              }

              if (description) {
                snippet.description = description;
              }

              data.snippet = snippet;
              (0, _request["default"])({
                uri: _constant.PLAYLIST_ITEMS_YOUTUBE_API_URL,
                method: 'POST',
                qs: {
                  part: 'snippet'
                },
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': "".concat(token.token_type, " ").concat(accessToken)
                },
                body: data,
                json: true
              }, function (err, _, body) {
                if (err) {
                  reject(err);
                }

                resolve(body);
              });
              _context2.next = 21;
              break;

            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2["catch"](0);
              reject(_context2.t0);

            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 18]]);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};

exports.insertPlaylistItem = insertPlaylistItem;