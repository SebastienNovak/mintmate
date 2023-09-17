'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ArtistDiaries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      entry: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });

    // Consider adding indexes for performance on frequently queried columns
    await queryInterface.addIndex('ArtistDiaries', ['date']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ArtistDiaries');
  }
};
