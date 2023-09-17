'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch the user IDs dynamically to ensure they exist
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" LIMIT 2`,  // Fetch the first two users as an example
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Check if there are enough users
    if (users.length < 2) {
      throw new Error('Failed to retrieve enough users for seeding.');
    }

    // Insert sample data into the Badges table using the dynamically retrieved user IDs
    return queryInterface.bulkInsert('Badges', [
      {
        userId: users[0].id,  // Use the ID of the first user
        name: 'Top Seller Bronze',
        description: 'Achieved a significant number of sales.',
        type: 'top_seller',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: users[1].id,  // Use the ID of the second user
        name: 'Super Fan Silver',
        description: 'Highly engaged with multiple artists on the platform.',
        type: 'super_fan',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Badges', null, {});
  }
};
