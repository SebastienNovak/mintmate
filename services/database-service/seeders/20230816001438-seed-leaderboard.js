'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    // Fetch User IDs from the Users table
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" LIMIT 4`, // Adjust the LIMIT as required
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (users.length < 4) {
      console.log("Not enough user profiles found. Cannot seed Leaderboards without the required user profiles.");
      return;
    }

    return queryInterface.bulkInsert('Leaderboards', [
      {
        userId: users[0].id,
        nftSales: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: users[1].id,
        nftSales: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: users[2].id,
        nftSales: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: users[3].id,
        nftSales: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ... add more leaderboard entries as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Leaderboards', null, {});
  }
};
