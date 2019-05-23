'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
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
        type: Sequelize.STRING,
        allowNull: true
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
        type: Sequelize.BIGINT,
        onDelete: 'CASCADE',
        references: {
          model: 'Channel',
          key: 'id',
          as: 'channel_id',
        },
      },
      playlist_id: {
        type: Sequelize.BIGINT,
        onDelete: 'CASCADE',
        references: {
          model: 'Playlist',
          key: 'id',
          as: 'playlist_id',
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PlaylistItems');
  }
};