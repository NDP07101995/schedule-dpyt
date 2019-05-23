'use strict';
module.exports = (sequelize, DataTypes) => {
  const DataKey = sequelize.define('DataKey', {
    id: DataTypes.BIGINT,
    userId: {
      type: DataTypes.BIGINT,
      field: 'user_id'
    },
    apiKey: {
      type: DataTypes.STRING,
      field: 'api_key'
    },
    idClient: {
      type: DataTypes.STRING,
      field: 'id_client'
    },
    clientSecret:{
      type:  DataTypes.STRING,
      field: 'client_secret'
    },
    primary: DataTypes.BOOLEAN,
    createdAt:{
        type: DataTypes.DATE,
        allowNull: true,
        field: 'created_at'
    },
    updatedAt:{
      type: DataTypes.DATE,
      allowNull: true,
      field: 'updated_at'
    }
  },{
    timestamps: true,
    underscored: true
  });
  DataKey.beforeCreate = function(datakey) {
    datakey.createdAt = new Date();
    datakey.updatedAt = new Date();
  };
  DataKey.beforeUpdate = function(datakey) {
    datakey.updatedAt = new Date();
  };
  DataKey.associate = function(models) {
    // associations can be defined here
  };
  return DataKey;
};