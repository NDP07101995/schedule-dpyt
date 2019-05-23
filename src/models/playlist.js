'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    id: DataTypes.BIGINT
  }, {});
  Playlist.associate = function(models) {
    // associations can be defined here
  };
  return Playlist;
};