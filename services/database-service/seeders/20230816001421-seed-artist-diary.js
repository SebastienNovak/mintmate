'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ArtistDiaries', [
      {
        date: new Date('2023-08-01'),
        entry: 'Started working on a new song today. Feeling inspired by the city.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        date: new Date('2023-08-03'),
        entry: 'Met with my producer. Discussed the direction of the new album.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ... other diary entries as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ArtistDiaries', null, {});
  }
};
