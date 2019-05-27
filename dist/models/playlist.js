'use strict';

module.exports = function (sequelize, DataTypes) {
  var Playlist = sequelize.define('Playlist', {
    uid: DataTypes.STRING,
    title: DataTypes.TEXT,
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    keywords: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    gl: DataTypes.STRING,
    hl: DataTypes.STRING,
    video_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    status_video: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    status_filter: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    filter_by_date_status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    filter_by_date: {
      type: DataTypes.STRING,
      allowNull: true
    },
    filter_by_duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    filter_by_view: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    filter_by_like: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    filter_by_dislike: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    search_video_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    view_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    channel_subscribe: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_id: DataTypes.BIGINT
  }, {
    timestamps: true
  });

  Playlist.associate = function (models) {
    Playlist.hasOne(models.Channel, {
      foreignKey: 'id',
      targetKey: 'channel_id'
    });
  };

  return Playlist;
};