'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AlbumGenres', {
      genreId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Genres',
          key: 'id'
        },
        allowNull: false,
        primaryKey: true
      },
      albumId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Albums',
          key: 'id'
        },
        allowNull: false,
        primaryKey: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AlbumGenres');
  }
};
