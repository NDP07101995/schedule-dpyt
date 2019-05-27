'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('data_keys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      api_key: {
        type: Sequelize.STRING
      },
      id_client: {
        type: Sequelize.STRING
      },
      client_secret: {
        type: Sequelize.STRING
      },
      primary: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('data_keys');
  }
};