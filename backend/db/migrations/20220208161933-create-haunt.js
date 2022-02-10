'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Haunts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'Users'}
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      state: {
        type: Sequelize.STRING(100)
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      latitude: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,6)
      },
      longitude: {
        allowNull: false,
        type: Sequelize.DECIMAL(11,6)
      },
      rate: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2)
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Haunts');
  }
};
