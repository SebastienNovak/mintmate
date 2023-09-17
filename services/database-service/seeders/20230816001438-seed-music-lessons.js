'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch all user IDs from the Users table
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" LIMIT 1`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (users.length < 3) {
      console.error("Not enough artist users in the database to seed MusicLessons!");
      return;
    }

    // Using the fetched IDs to seed MusicLessons
    return queryInterface.bulkInsert('MusicLessons', [
      {
        title: 'Guitar Basics',
        description: 'A beginner lesson on how to get started with playing the guitar.',
        videoUrl: 'https://example.com/guitar_basics.mp4',
        price: 29.99,
        artistId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Advanced Drumming Techniques',
        description: 'An advanced lesson exploring complex drumming techniques.',
        videoUrl: 'https://example.com/drumming_advanced.mp4',
        price: 49.99,
        artistId: users[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Introduction to Jazz Piano',
        description: 'An introductory lesson into the world of jazz piano.',
        videoUrl: 'https://example.com/jazz_piano_intro.mp4',
        price: 39.99,
        artistId: users[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ... add more music lesson entries as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MusicLessons', null, {});
  }
};
