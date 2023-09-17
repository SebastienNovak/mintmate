'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    // Fetch user IDs based on their emails
    const users = await queryInterface.sequelize.query(
      `SELECT id, email FROM "Users" WHERE email IN ('johndoe@example.com', 'janesmith@example.com', 'alexmorgan@example.com')`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    const johnDoeId = users.find(user => user.email === 'johndoe@example.com').id;
    const janeSmithId = users.find(user => user.email === 'janesmith@example.com').id;
    const alexMorganId = users.find(user => user.email === 'alexmorgan@example.com').id;

    await queryInterface.bulkInsert('Albums', [
      {
        title: 'Journey Through Sound',
        releaseDate: new Date('2022-01-15'),
        coverArt: 'path/to/coverArt1.jpg',
        genre: 'Rock',
        userId: johnDoeId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Melodic Waves',
        releaseDate: new Date('2021-05-20'),
        coverArt: 'path/to/coverArt2.jpg',
        genre: 'Pop',
        userId: janeSmithId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Echoes of the Past',
        releaseDate: new Date('2020-10-10'),
        coverArt: 'path/to/coverArt3.jpg',
        genre: 'Jazz',
        userId: alexMorganId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Rising Star',
        releaseDate: new Date('2019-08-15'),
        coverArt: 'path/to/coverArtMorgan1.jpg',
        genre: 'Pop Jazz',
        userId: alexMorganId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Albums', null, {});
  }
};
