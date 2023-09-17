'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('MusicVideos', [
      {
        title: 'Shape of You',
        description: 'Music video by Ed Sheeran performing Shape of You.',
        videoUrl: 'https://example.com/shape_of_you.mp4',
        releaseDate: new Date(2017, 0, 6), // January 6, 2017
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Blinding Lights',
        description: 'Music video by The Weeknd performing Blinding Lights.',
        videoUrl: 'https://example.com/blinding_lights.mp4',
        releaseDate: new Date(2019, 11, 29), // December 29, 2019
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ... you can add more sample music video entries as required
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MusicVideos', null, {});
  }
};
