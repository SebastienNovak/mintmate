'use strict';

const currentDate = new Date();
const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch artist IDs dynamically to ensure they exist
    const artists = await queryInterface.sequelize.query(
      `SELECT id FROM "ArtistProfiles" LIMIT 3`,  // Fetch the first three artists as an example
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Check if there are enough artists
    if (artists.length < 3) {
      throw new Error('Failed to retrieve enough artists for seeding.');
    }

    // Insert sample data into the Stories table using the dynamically retrieved artist IDs
    await queryInterface.bulkInsert('Stories', [
      {
        content: "Excited about my new track dropping soon!",
        mediaUrl: "story1.jpg",
        expiresAt: new Date(currentDate.getTime() + oneDayInMilliseconds), 
        artistId: artists[0].id,  // Use the ID of the first artist
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        content: "Behind the scenes of our latest music video.",
        mediaUrl: "story2.jpg",
        expiresAt: new Date(currentDate.getTime() + oneDayInMilliseconds),
        artistId: artists[1].id,  // Use the ID of the second artist
        createdAt: currentDate,
        updatedAt: currentDate
      },
      {
        content: "Studio time! Creating new beats.",
        mediaUrl: "story3.mp4", 
        expiresAt: new Date(currentDate.getTime() + oneDayInMilliseconds),
        artistId: artists[2].id,  // Use the ID of the third artist
        createdAt: currentDate,
        updatedAt: currentDate
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Stories', null, {});
  }
};
