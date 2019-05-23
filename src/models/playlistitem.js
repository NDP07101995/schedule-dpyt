'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlaylistItem = sequelize.define('PlaylistItem', {
    id: DataTypes.BIGINT
  }, {});
  PlaylistItem.associate = function(models) {
    // associations can be defined here
  };
  return PlaylistItem;
};