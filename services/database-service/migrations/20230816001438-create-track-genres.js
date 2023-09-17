'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TrackGenres', {
      genreId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Genres',
          key: 'id'
        },
        allowNull: false,
        primaryKey: true
      },
      trackId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tracks',
          key: 'id'
        },
        allowNull: false,
        primaryKey: true
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TrackGenres');
  }
};
