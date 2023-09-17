'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch all user IDs from the Users table
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" LIMIT 1`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (users.length < 2) {
      console.error("Not enough artist users in the database to seed Merchandises!");
      return;
    }

    // Using the IDs we fetched to seed Merchandises
    return queryInterface.bulkInsert('Merchandises', [
      {
        name: 'Cool Artist T-Shirt',
        description: 'A stylish T-shirt featuring Cool Artist design',
        price: 19.99,
        imageUrl: 'https://example.com/tshirt1.jpg',
        artistId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cool Artist Cap',
        description: 'A cap with Cool Artist logo',
        price: 14.99,
        imageUrl: 'https://example.com/cap1.jpg',
        artistId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Another Artist Poster',
        description: 'A poster featuring Another Artist',
        price: 9.99,
        imageUrl: 'https://example.com/poster2.jpg',
        artistId: users[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ... add more merchandise entries as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Merchandises', null, {});
  }
};
