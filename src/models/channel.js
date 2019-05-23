'use strict';
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    id: DataTypes.BIGINT,
    userId: {
      type: DataTypes.BIGINT,
      field: 'user_id'
    },
    uid: DataTypes.STRING,
    title: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    view: DataTypes.STRING,
    subscriber: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    accessToken:{
      type: DataTypes.STRING,
      field: 'access_token'
    },
    refreshToken:{
      type: DataTypes.STRING,
      field: 'refresh_token'
    },
    expiresIn:{
      type: DataTypes.INTEGER,
      field: 'expires_in'
    },
    iat:{
      type: DataTypes.DATE,
      allowNull: true
    },
    createdAt:{
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at'
    },
    updatedAt:{
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at'
    },
  },{
    timestamps: true,
    underscored: true
  });
  Channel.beforeCreate = function(channel) {
    channel.createdAt = new Date();
    channel.updatedAt = new Date();
  };
  Channel.beforeUpdate = function(channel) {
    channel.updatedAt = new Date();
  };
  Channel.associate = function(models) {
    // associations can be defined here
  };
  return Channel;
};