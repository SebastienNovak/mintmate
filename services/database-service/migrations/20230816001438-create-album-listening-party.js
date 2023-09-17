'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AlbumListeningParties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      albumId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      virtualStageId: {
        type: Sequelize.INTEGER
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

    // If your DB supports it, consider adding indexes for performance
    await queryInterface.addIndex('AlbumListeningParties', ['albumId']);
    await queryInterface.addIndex('AlbumListeningParties', ['virtualStageId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AlbumListeningParties');
  }
};
