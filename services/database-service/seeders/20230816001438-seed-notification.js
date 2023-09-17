'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch user IDs from the Users table
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" LIMIT 4`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (users.length < 4) {
      console.error("Not enough users in the database to seed Notifications!");
      return;
    }

    // Using the fetched IDs to seed Notifications
    return queryInterface.bulkInsert('Notifications', [
      {
        content: 'Your bid for the artwork has been outbid by another user.',
        type: 'bid',
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'Your purchase for the album "Heavenly Tunes" was successful.',
        type: 'purchase',
        userId: users[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'Join us for the live event happening tomorrow at 8 PM.',
        type: 'event',
        userId: users[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'You have a new message from Artist XYZ.',
        type: 'message',
        userId: users[3].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notifications', null, {});
  }
};
