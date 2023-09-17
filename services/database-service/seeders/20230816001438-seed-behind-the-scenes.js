'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch the artist IDs dynamically to ensure they exist
    const artists = await queryInterface.sequelize.query(
      `SELECT id FROM "ArtistProfiles" LIMIT 2`,  // Fetch the first two artists as an example
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Check if there are enough artists
    if (artists.length < 2) {
      throw new Error('Failed to retrieve enough artists for seeding.');
    }

    // Insert sample data into the BehindTheScenes table using the dynamically retrieved artist IDs
    return queryInterface.bulkInsert('BehindTheScenes', [
      {
        artistId: artists[0].id,  // Use the ID of the first artist
        title: 'Recording My New Album',
        content: 'Today was an incredible day at the studio. We laid down the tracks for three new songs.',
        mediaUrl: 'https://example.com/path/to/your/media1.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistId: artists[1].id,  // Use the ID of the second artist
        title: 'Tour Rehearsals',
        content: 'Kicking off tour rehearsals. The energy is electric!',
        mediaUrl: 'https://example.com/path/to/your/media2.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BehindTheScenes', null, {});
  }
};
