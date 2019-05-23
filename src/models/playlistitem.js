'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlaylistItem = sequelize.define('PlaylistItem', {
    uid: DataTypes.STRING,
    video_uid: DataTypes.STRING,
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    position: DataTypes.INTEGER,
    view_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    like_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    dislike_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    favorite_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    comment_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    user_id: DataTypes.BIGINT
  }, {
    timestamps: true
  });
  PlaylistItem.associate = function(models) {

    PlaylistItem.belongsTo(models.Channel, {
      foreignKey: 'channel_id',
      onDelete: 'CASCADE',
    });

    PlaylistItem.belongsTo(models.Playlist, {
      foreignKey: 'playlist_id',
      onDelete: 'CASCADE',
    });
  };
  return PlaylistItem;
};