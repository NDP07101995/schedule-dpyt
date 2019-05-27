"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheduleSearchVideoChannel = exports.scheduleSearchVideoPlaylist = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _nodeSchedule = _interopRequireDefault(require("node-schedule"));

var _logger = _interopRequireDefault(require("./logger"));

var _index = _interopRequireDefault(require("../models/index"));

var _sequelize = require("sequelize");

var _constant = require("./constant");

var _youtubeSearchService = require("../services/youtubeSearchService");

var _youtubePlaylistService = require("../services/youtubePlaylistService");

/**
 * 
 * @param {string} duration
 * @description get second from duration
 */
var getTime = function getTime(duration) {
  var str = duration.match(/\d+/g, "") + '';

  if (str.indexOf(',') > -1) {
    var arr = str.split(',');

    if (arr.length == 3) {
      var time = parseInt(arr[0]) * 60 * 60;
      time = time + parseInt(arr[1]) * 60;
      return time + parseInt(arr[2]);
    } else if (arr.length == 2) {
      var _time = parseInt(arr[0]) * 60;

      return _time + parseInt(arr[1]);
    }
  }

  return parseInt(str);
};

var sleep = function sleep(min, max) {
  var ms = Math.floor(Math.random() * (max - min)) + min;
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
};
/**
 * @description search video from keywors add to playlist
 */


var scheduleSearchVideoPlaylist = function scheduleSearchVideoPlaylist() {
  _nodeSchedule["default"].scheduleJob(_constant.CRON_SCHEDULE_SEARCH_VIDEO_PLAYLIST,
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2() {
    var playlists, i, len, userId, videoCount, playlistItems, dataKey, channel, token, searchKeywords, arrVideoId, j, lenJ;
    return _regenerator["default"].wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _index["default"].Playlist.findAll({
              where: {
                channel_subscribe: (0, _defineProperty2["default"])({}, _sequelize.Op.is, null)
              }
            });

          case 3:
            playlists = _context3.sent;

            _logger["default"].debug(playlists);

            i = 0, len = playlists.length;

          case 6:
            if (!(i < len)) {
              _context3.next = 37;
              break;
            }

            userId = playlists[i].user_id;
            videoCount = playlists[i].video_count; // Get all playlist item of playlist

            _context3.next = 11;
            return _index["default"].PlaylistItem.findAll({
              where: {
                user_id: userId,
                playlist_id: playlists[i].id
              }
            });

          case 11:
            playlistItems = _context3.sent;

            _logger["default"].debug(playlistItems);

            _logger["default"].debug('line 02' + playlistItems.length); //max size playlist 25


            if (!(playlistItems.length < 25)) {
              _context3.next = 34;
              break;
            }

            _logger["default"].debug('line 1');

            _context3.next = 18;
            return _index["default"].DataKey.findOne({
              where: {
                user_id: userId,
                primary: true
              }
            });

          case 18:
            dataKey = _context3.sent;
            _context3.next = 21;
            return _index["default"].Channel.findOne({
              where: {
                user_id: userId,
                id: playlists[i].channel_id
              }
            });

          case 21:
            channel = _context3.sent;
            token = {
              id: channel.id,
              access_token: channel.access_token,
              refresh_token: channel.refresh_token,
              token_type: channel.token_type,
              expires_in: channel.expires_in,
              iat: channel.iat,
              id_client: dataKey.id_client,
              client_secret: dataKey.client_secret
            };

            _logger["default"].debug(token); //search video from keywords playlist


            _context3.next = 26;
            return (0, _youtubeSearchService.searchKeyWord)(dataKey.api_key, playlists[i].keywords, 20, playlists[i].gl, playlists[i].hl);

          case 26:
            searchKeywords = _context3.sent;

            _logger["default"].debug(searchKeywords);

            _context3.next = 30;
            return _index["default"].Playlist.update({
              search_video_count: searchKeywords.pageInfo.totalResults
            }, {
              where: {
                id: playlists[i].id
              }
            });

          case 30:
            arrVideoId = [];

            for (j = 0, lenJ = searchKeywords.items.length; j < lenJ; j++) {
              arrVideoId.push(searchKeywords.items[j].id.videoId);
            }

            if (!(arrVideoId.length > 1)) {
              _context3.next = 34;
              break;
            }

            return _context3.delegateYield(
            /*#__PURE__*/
            _regenerator["default"].mark(function _callee() {
              var listVideos, _loop, k, lenK, _ret;

              return _regenerator["default"].wrap(function _callee$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _logger["default"].debug('line 2'); //list video from id -> list search keywords


                      _context2.next = 3;
                      return (0, _youtubeSearchService.searchVideoById)(dataKey.api_key, arrVideoId.join());

                    case 3:
                      listVideos = _context2.sent;
                      _loop =
                      /*#__PURE__*/
                      _regenerator["default"].mark(function _loop(k, lenK) {
                        var arrFilter, dateRes, timeRes, playlistItemRes, playlistItem;
                        return _regenerator["default"].wrap(function _loop$(_context) {
                          while (1) {
                            switch (_context.prev = _context.next) {
                              case 0:
                                _logger["default"].debug('line 3');

                                arrFilter = playlistItems.findIndex(function (item) {
                                  if (item.video_uid == listVideos.items[k].id) {
                                    return true;
                                  }

                                  return false;
                                });

                                if (!(arrFilter === -1)) {
                                  _context.next = 44;
                                  break;
                                }

                                if (!playlists[i].status_filter) {
                                  _context.next = 27;
                                  break;
                                }

                                _logger["default"].debug('line 4');

                                if (!playlists[i].filter_by_date) {
                                  _context.next = 15;
                                  break;
                                }

                                dateRes = new Date(listVideos.items[k].snippet.publishedAt);
                                timeRes = dateRes.getTime();

                                if (!playlists[i].filter_by_date_status) {
                                  _context.next = 13;
                                  break;
                                }

                                if (!(playlists[i].filter_by_date.getTime() < timeRes)) {
                                  _context.next = 11;
                                  break;
                                }

                                return _context.abrupt("return", "continue");

                              case 11:
                                _context.next = 15;
                                break;

                              case 13:
                                if (!(playlists[i].filter_by_date.getTime() > timeRes)) {
                                  _context.next = 15;
                                  break;
                                }

                                return _context.abrupt("return", "continue");

                              case 15:
                                if (!playlists[i].filter_by_duration) {
                                  _context.next = 18;
                                  break;
                                }

                                if (!(getTime(listVideos.items[k].contentDetails.duration) < playlists[i].filter_by_duration)) {
                                  _context.next = 18;
                                  break;
                                }

                                return _context.abrupt("return", "continue");

                              case 18:
                                if (!playlists[i].filter_by_view) {
                                  _context.next = 21;
                                  break;
                                }

                                if (!(parseInt(listVideos.items[k].statistics.viewCount) < playlists[i].filter_by_view)) {
                                  _context.next = 21;
                                  break;
                                }

                                return _context.abrupt("return", "continue");

                              case 21:
                                if (!playlists[i].filter_by_like) {
                                  _context.next = 24;
                                  break;
                                }

                                if (!(parseInt(listVideos.items[k].statistics.likeCount) < playlists[i].filter_by_like)) {
                                  _context.next = 24;
                                  break;
                                }

                                return _context.abrupt("return", "continue");

                              case 24:
                                if (!playlists[i].filter_by_dislike) {
                                  _context.next = 27;
                                  break;
                                }

                                if (!(parseInt(listVideos.items[k].statistics.dislikeCount) < playlists[i].filter_by_dislike)) {
                                  _context.next = 27;
                                  break;
                                }

                                return _context.abrupt("return", "continue");

                              case 27:
                                _logger["default"].debug('line 5');

                                _context.next = 30;
                                return sleep(30000, 60000);

                              case 30:
                                _logger["default"].debug('line 6');

                                _context.next = 33;
                                return (0, _youtubePlaylistService.insertPlaylistItem)(token, playlists[i].uid, listVideos.items[k].id, videoCount, listVideos.items[k].snippet.title, listVideos.items[k].snippet.description);

                              case 33:
                                playlistItemRes = _context.sent;

                                _logger["default"].debug(playlistItemRes);

                                _context.next = 37;
                                return _index["default"].PlaylistItem.create({
                                  uid: playlistItemRes.id,
                                  video_uid: listVideos.items[k].id,
                                  position: videoCount,
                                  title: listVideos.items[k].snippet.title,
                                  description: listVideos.items[k].snippet.description,
                                  view_count: parseInt(listVideos.items[k].statistics.viewCount),
                                  like_count: parseInt(listVideos.items[k].statistics.likeCount),
                                  dislike_count: parseInt(listVideos.items[k].statistics.dislikeCount),
                                  favorite_count: parseInt(listVideos.items[k].statistics.favoriteCount),
                                  comment_count: parseInt(listVideos.items[k].statistics.commentCount),
                                  status: 'public',
                                  user_id: userId,
                                  playlist_id: playlists[i].id,
                                  channel_id: channel.id
                                });

                              case 37:
                                playlistItem = _context.sent;

                                _logger["default"].debug('line 6');

                                if (!(playlistItem.id > 0)) {
                                  _context.next = 44;
                                  break;
                                }

                                _logger["default"].debug('line 7');

                                videoCount++;
                                _context.next = 44;
                                return _index["default"].Playlist.update({
                                  video_count: videoCount
                                }, {
                                  where: {
                                    id: playlists[i].id
                                  }
                                });

                              case 44:
                              case "end":
                                return _context.stop();
                            }
                          }
                        }, _loop);
                      });
                      k = 0, lenK = listVideos.items.length;

                    case 6:
                      if (!(k < lenK)) {
                        _context2.next = 14;
                        break;
                      }

                      return _context2.delegateYield(_loop(k, lenK), "t0", 8);

                    case 8:
                      _ret = _context2.t0;

                      if (!(_ret === "continue")) {
                        _context2.next = 11;
                        break;
                      }

                      return _context2.abrupt("continue", 11);

                    case 11:
                      k++;
                      _context2.next = 6;
                      break;

                    case 14:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee);
            })(), "t0", 34);

          case 34:
            i++;
            _context3.next = 6;
            break;

          case 37:
            _context3.next = 42;
            break;

          case 39:
            _context3.prev = 39;
            _context3.t1 = _context3["catch"](0);

            _logger["default"].debug(_context3.t1);

          case 42:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee2, null, [[0, 39]]);
  })));
};
/**
 * @description search video from channel subscribe create playlist, add video to playlist
 */


exports.scheduleSearchVideoPlaylist = scheduleSearchVideoPlaylist;

var scheduleSearchVideoChannel = function scheduleSearchVideoChannel() {// schedule.scheduleJob(CRON_SCHEDULE_SEARCH_VIDEO_CHANNEL, function () {
  //     const currentDate = new Date();
  //     const iatDate = new Date('2019-05-23 19:04:51');
  //     logger.debug('Channel currentDate: ' + currentDate.getTime() + ' iatDate: ' + iatDate.getTime());
  // });
};

exports.scheduleSearchVideoChannel = scheduleSearchVideoChannel;