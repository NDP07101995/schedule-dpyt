"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getToken = getToken;

var _request = _interopRequireDefault(require("request"));

var _index = _interopRequireDefault(require("../models/index"));

var _constant = require("../util/constant");

var _logger = _interopRequireDefault(require("../util/logger"));

/**
 * 
 * @param {object} token {"access_token", "refresh_token", "token_type", "expires_in", "iat", "id", "id_client", "client_secret"}
 */
function getToken(token) {
  return new Promise(function (resolve, reject) {
    var currentTime = new Date().getTime();
    var iatTime = token.iat.getTime();

    _logger["default"].debug('time current ' + currentTime);

    _logger["default"].debug('iatTime  ' + iatTime);

    if (iatTime - 30 > currentTime) {
      return resolve(token.access_token);
    }

    _request["default"].post(_constant.GOOGLE_API_REFRESH_TOKEN, {
      form: {
        grant_type: 'refresh_token',
        client_id: token.id_client,
        client_secret: token.client_secret,
        refresh_token: token.refresh_token
      },
      json: true
    }, function (err, _, body) {
      if (err) {
        return reject(err);
      }

      _index["default"].Channel.update({
        access_token: body.access_token,
        expires_in: body.expires_in,
        token_type: body.token_type
      }, {
        where: {
          id: token.id
        }
      }).then(function (rowsUpdated) {
        _logger["default"].debug("row update channel : ".concat(rowsUpdated));

        return resolve(body.access_token);
      })["catch"](function (err) {
        return reject(err);
      });
    });
  });
}