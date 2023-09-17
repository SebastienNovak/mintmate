'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch user IDs from the Users table
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" LIMIT 2`, // This fetches the IDs of the first two users. Adjust as necessary.
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Check if the required number of users were found
    if (users.length < 2) {
      console.log("Not enough users found. Cannot seed Chats without the required users.");
      return;
    }

    // Dynamically set senderId and receiverId
    const senderId = users[0].id;
    const receiverId = users[1].id;

    return queryInterface.bulkInsert('Chats', [
      {
        message: 'Hello there!',
        senderId: senderId,
        receiverId: receiverId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'Hi! How are you?',
        senderId: receiverId, // Note the role reversal here
        receiverId: senderId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'I am good. How about you?',
        senderId: senderId,
        receiverId: receiverId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Chats', null, {});
  }
};
