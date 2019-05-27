'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

module.exports = function (sequelize, DataTypes) {
  var _sequelize$define;

  var PlaylistItem = sequelize.define('PlaylistItem', (_sequelize$define = {
    uid: DataTypes.STRING,
    video_uid: DataTypes.STRING,
    title: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, (0, _defineProperty2["default"])(_sequelize$define, "title", {
    type: DataTypes.TEXT,
    allowNull: true
  }), (0, _defineProperty2["default"])(_sequelize$define, "description", {
    type: DataTypes.TEXT,
    allowNull: true
  }), (0, _defineProperty2["default"])(_sequelize$define, "status", {
    type: DataTypes.STRING,
    allowNull: true
  }), (0, _defineProperty2["default"])(_sequelize$define, "position", DataTypes.INTEGER), (0, _defineProperty2["default"])(_sequelize$define, "view_count", {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }), (0, _defineProperty2["default"])(_sequelize$define, "like_count", {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }), (0, _defineProperty2["default"])(_sequelize$define, "dislike_count", {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }), (0, _defineProperty2["default"])(_sequelize$define, "favorite_count", {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }), (0, _defineProperty2["default"])(_sequelize$define, "comment_count", {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }), (0, _defineProperty2["default"])(_sequelize$define, "user_id", DataTypes.BIGINT), (0, _defineProperty2["default"])(_sequelize$define, "channel_id", DataTypes.BIGINT), (0, _defineProperty2["default"])(_sequelize$define, "playlist_id", DataTypes.BIGINT), _sequelize$define), {
    timestamps: true
  });
  return PlaylistItem;
};