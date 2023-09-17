'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch all user IDs from the Users table
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM "Users"',
      {
        type: Sequelize.QueryTypes.SELECT
      }
    );

    if (users.length < 4) {
      console.error("Not enough users in the database to seed Mentorships!");
      return;
    }

    // Using the IDs we fetched to seed Mentorships
    return queryInterface.bulkInsert('Mentorships', [
      {
        artistId: users[0].id,
        menteeId: users[1].id,
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 6)), 
        topics: ['Songwriting', 'Vocal Training'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistId: users[0].id,
        menteeId: users[2].id,
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
        topics: ['Guitar Lessons', 'Music Production'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        artistId: users[2].id,
        menteeId: users[3].id,
        startDate: new Date(),
        endDate: null,
        topics: ['Piano Lessons'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Mentorships', null, {});
  }
};
