'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _index = _interopRequireDefault(require("../models/index"));

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('PlaylistItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      uid: {
        type: Sequelize.STRING
      },
      video_uid: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true
      },
      position: {
        type: Sequelize.INTEGER
      },
      view_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      like_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      dislike_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      favorite_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      comment_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      user_id: {
        type: Sequelize.BIGINT
      },
      channel_id: {
        type: Sequelize.BIGINT
      },
      playlist_id: {
        type: Sequelize.BIGINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('PlaylistItems');
  }
};