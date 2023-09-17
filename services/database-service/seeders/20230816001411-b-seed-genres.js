'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Genres', [
      {
        name: 'Rock',
        description: 'A genre of popular music that originated as rock and roll in the United States in the late 1940s and early 1950s.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pop',
        description: 'A genre of popular music that originated in its modern form during the mid-1950s in the United States and the United Kingdom.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jazz',
        description: 'Originated in the African-American communities of New Orleans, Jazz is characterized by swing and blue notes, call and response vocals, polyrhythms and improvisation.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hip-Hop',
        description: 'Also called rap music, Hip-Hop is a genre developed in the United States by inner-city African Americans and Latino Americans in the Bronx borough of New York City in the 1970s.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Classical',
        description: 'A genre of music that includes a broad span of time from the 11th century to the present day.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ... you can continue adding more genres as per your needs
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Genres', null, {});
  }
};
