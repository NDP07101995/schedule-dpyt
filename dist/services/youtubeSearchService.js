"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchVideoById = exports.searchByChannel = exports.searchKeyWord = void 0;

var _request = _interopRequireDefault(require("request"));

var _constant = require("../util/constant");

/**
 * 
 * @param {string} key 
 * @param {string} q 
 * @param {number} maxResult 
 * @param {string} regionCode 
 * @param {string} relevanceLanguage 
 * @param {string} orderBy 
 * @param {string} type 
 */
var searchKeyWord = function searchKeyWord(key, q) {
  var maxResult = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;
  var regionCode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'VN';
  var relevanceLanguage = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'vi';
  var orderBy = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'viewCount';
  var type = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'video';
  return new Promise(function (resolve, reject) {
    var query = {};
    query.part = 'snippet';
    query.q = q;
    query.maxResults = maxResult;
    query.regionCode = regionCode;
    query.relevanceLanguage = relevanceLanguage;
    query.order = orderBy;
    query.type = type;
    query.key = key;
    (0, _request["default"])({
      uri: _constant.SEARCH_YOUTUBE_API_URL,
      method: 'GET',
      qs: query,
      headers: {
        'Accept': 'application/json'
      },
      json: true
    }, function (err, _, body) {
      if (err) {
        reject(err);
      }

      resolve(body);
    });
  });
};
/**
 * 
 * @param {string} key 
 * @param {string} channelId 
 * @param {string} pageToken 
 * @param {number} maxResult 
 * @param {string} orderBy 
 * @param {string} type 
 */


exports.searchKeyWord = searchKeyWord;

var searchByChannel = function searchByChannel(key, channelId) {
  var pageToken = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var maxResult = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 25;
  var orderBy = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'date';
  var type = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'video';
  return new Promise(function (resolve, reject) {
    var query = {};
    query.part = 'snippet';
    query.channelId = channelId;
    query.maxResults = maxResult;
    query.order = orderBy;
    query.type = type;
    query.key = key;

    if (!(pageToken == null)) {
      query.pageToken = pageToken;
    }

    (0, _request["default"])({
      uri: _constant.SEARCH_YOUTUBE_API_URL,
      method: 'GET',
      qs: query,
      headers: {
        'Accept': 'application/json'
      },
      json: true
    }, function (err, _, body) {
      if (err) {
        reject(err);
      }

      resolve(body);
    });
  });
};
/**
 * 
 * @param {string} key 
 * @param {string} id 
 */


exports.searchByChannel = searchByChannel;

var searchVideoById = function searchVideoById(key, id) {
  return new Promise(function (resolve, reject) {
    var query = {};
    query.part = 'snippet,contentDetails,statistics';
    query.id = id;
    query.key = key;
    (0, _request["default"])({
      uri: _constant.VIDEO_YOUTUBE_API_URL,
      method: 'GET',
      qs: query,
      headers: {
        'Accept': 'application/json'
      },
      json: true
    }, function (err, _, body) {
      if (err) {
        reject(err);
      }

      resolve(body);
    });
  });
};

exports.searchVideoById = searchVideoById;