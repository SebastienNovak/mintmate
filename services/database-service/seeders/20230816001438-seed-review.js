'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch user IDs from the Users table
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" LIMIT 3`,
      {
        type: Sequelize.QueryTypes.SELECT
      }
    );

    if (users.length < 3) {
      console.error("Not enough users in the database to seed Reviews!");
      return;
    }

    // Fetch track and album IDs
    const [track] = await queryInterface.sequelize.query('SELECT id FROM "Tracks" LIMIT 1', { type: Sequelize.QueryTypes.SELECT });
  const [album] = await queryInterface.sequelize.query('SELECT id FROM "Albums" LIMIT 1', { type: Sequelize.QueryTypes.SELECT });


    if (!track || !album) {
      console.error("Missing tracks or albums in the database to seed Reviews!");
      return;
    }

    // Using the fetched IDs to seed Reviews
    return queryInterface.bulkInsert('Reviews', [
      {
        content: "Amazing track!",
        rating: 5,
        type: 'track',
        userId: users[0].id,
        trackId: track.id,
        albumId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "The album is a masterpiece.",
        rating: 4,
        type: 'album',
        userId: users[1].id,
        trackId: null,
        albumId: album.id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: "The artist's evolution is evident.",
        rating: 5,
        type: 'artist',
        userId: users[2].id,
        trackId: null,
        albumId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
