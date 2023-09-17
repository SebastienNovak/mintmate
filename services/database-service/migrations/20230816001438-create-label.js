'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Labels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    // Adding a column for labelId in the Users table for the association
    await queryInterface.addColumn('Users', 'labelId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Labels', // Name of the created table
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove labelId column first
    await queryInterface.removeColumn('Users', 'labelId');

    // Then drop the Labels table
    await queryInterface.dropTable('Labels');
  }
};
