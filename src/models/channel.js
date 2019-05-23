'use strict';
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    uid: DataTypes.STRING,
    title: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    view: DataTypes.STRING,
    subscriber: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    access_token: DataTypes.STRING,
    refresh_token: DataTypes.STRING,
    token_type: DataTypes.STRING,
    expires_in: DataTypes.INTEGER,
    iat: DataTypes.DATE,
    user_id: DataTypes.BIGINT
  }, {
    timestamps: true
  });
  Channel.associate = function(models) {
    Channel.hasMany(models.Playlist, {
      foreignKey: 'channel_id',
      as: 'playlists',
    });
  };
  return Channel;
};