'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    // Fetch artist IDs based on their unique attributes
    const artists = await queryInterface.sequelize.query(
      `SELECT id, biography FROM "ArtistProfiles" WHERE biography IN ('Artist A has been in the music industry for over 20 years...', 'Jane Smith, commonly known by her stage name "J-Smooth", is a Pop sensation who has been climbing the charts rapidly...')`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    const artistAId = artists.find(artist => artist.biography === 'Artist A has been in the music industry for over 20 years...').id;
    const jSmoothId = artists.find(artist => artist.biography === 'Jane Smith, commonly known by her stage name "J-Smooth", is a Pop sensation who has been climbing the charts rapidly...').id;

    await queryInterface.bulkInsert('AlbumConcepts', [
      {
        artistId: artistAId,
        title: 'Journey Through the Stars',
        description: 'An ethereal album concept centered around space exploration and the wonders of the universe.',
        images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
      },
      {
        artistId: jSmoothId,
        title: 'Sounds of the Earth',
        description: 'A nature-inspired album capturing the serenity and raw power of our planet.',
        images: ['earth1.jpg', 'earth2.jpg', 'earth3.jpg'],
      },
      // ... add more sample data as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('AlbumConcepts', null, {});
  }
};
