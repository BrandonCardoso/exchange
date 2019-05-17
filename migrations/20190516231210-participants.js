'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Participants', {
      group_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Participants')
  }
};
