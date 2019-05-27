'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('playlists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      uid: {
        type: Sequelize.STRING
      },
      title: Sequelize.TEXT,
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      keywords: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      gl: {
        type: Sequelize.STRING
      },
      hl: {
        type: Sequelize.STRING
      },
      video_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      status_video: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      status_filter: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      filter_by_date_status: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      filter_by_date: {
        type: Sequelize.STRING,
        allowNull: true
      },
      filter_by_duration: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      filter_by_view: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      filter_by_like: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      filter_by_dislike: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      search_video_count: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      view_count: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      channel_subscribe: {
        type: Sequelize.STRING,
        allowNull: true
      },
      user_id: {
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
    return queryInterface.dropTable('playlists');
  }
};