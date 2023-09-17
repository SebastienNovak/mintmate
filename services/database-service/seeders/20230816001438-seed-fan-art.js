'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('FanArts', [
      {
        title: 'Epic Fan Art 1',
        imageUrl: 'http://example.com/fanart1.jpg',
        description: 'A fan art of Artist A performing on stage.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Majestic Fan Art 2',
        imageUrl: 'http://example.com/fanart2.jpg',
        description: 'A vibrant fan art of Artist B with a guitar.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Stunning Artwork 3',
        imageUrl: 'http://example.com/fanart3.jpg',
        description: 'A serene fan art of Artist C playing the piano.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ... add more fan arts as desired
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('FanArts', null, {});
  }
};
