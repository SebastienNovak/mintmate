'use strict';
const db = require('../models/user'); // or wherever your sequelize initialization is
const User = db.User;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch all users
    const users = await queryInterface.sequelize.query('SELECT * FROM "Users"', { type: queryInterface.sequelize.QueryTypes.SELECT });

    // Check if there are enough users
    if (users.length < 2) throw new Error("Not enough users to seed VirtualStudioSessions");

    // Use the IDs dynamically
    await queryInterface.bulkInsert('VirtualStudioSessions', [{
      artistId: users[0].id,  // Using the ID of the first user
      date: new Date('2023-08-20T14:00:00.000Z'),
      duration: 120,
      virtualLink: 'https://virtual.studio/session/1',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      artistId: users[1].id,  // Using the ID of the second user
      date: new Date('2023-08-22T16:00:00.000Z'),
      duration: 90,
      virtualLink: 'https://virtual.studio/session/2',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);

    // ... (You can continue with similar patterns for other tables)

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('VirtualStudioSessions', null, {});
    // ... (Continue with other tables as per your needs)
  }
};
