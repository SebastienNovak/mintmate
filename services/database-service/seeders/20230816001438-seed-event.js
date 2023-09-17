'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    // Fetch Artist IDs from the ArtistProfiles table
    const artists = await queryInterface.sequelize.query(
      `SELECT id FROM "ArtistProfiles" LIMIT 2`, 
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (artists.length < 2) {
      console.log("Not enough artist profiles found. Cannot seed Events without the required artist profiles.");
      return;
    }

    return queryInterface.bulkInsert('Events', [
      {
        name: 'Rock Night Concert',
        description: 'An electrifying night of rock music featuring top artists.',
        date: new Date('2023-09-15'),
        location: 'Stadium XYZ, City ABC',
        ticketPrice: 50.75,
        imageUrl: 'http://example.com/image1.jpg',
        artistId: artists[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jazz in the Park',
        description: 'Relaxing jazz tunes under the starry night at Central Park.',
        date: new Date('2023-10-05'),
        location: 'Central Park, City DEF',
        ticketPrice: 25.50,
        imageUrl: 'http://example.com/image2.jpg',
        artistId: artists[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ... add more events as desired
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
};
