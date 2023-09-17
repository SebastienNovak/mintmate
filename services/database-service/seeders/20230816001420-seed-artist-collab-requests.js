'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch artist IDs dynamically to ensure they exist
    const artists = await queryInterface.sequelize.query(
      `SELECT id FROM "ArtistProfiles"`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Check for existence and if there are at least two artists
    if (!artists || artists.length < 2) {
      throw new Error('Failed to retrieve enough artists for seeding.');
    }

    // Create the ArtistCollabRequests entries using the dynamically retrieved artist IDs
    const artistCollabRequests = [
      {
        artistId: artists[0].id, // Using the ID of the first artist
        description: 'Looking to collaborate on a Jazz project',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistId: artists[1].id, // Using the ID of the second artist
        description: 'Seeking a vocalist for a rock album',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ... you can add more entries if needed, following the pattern
    ];

    return queryInterface.bulkInsert('ArtistCollabRequests', artistCollabRequests, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ArtistCollabRequests', null, {});
  }
};
