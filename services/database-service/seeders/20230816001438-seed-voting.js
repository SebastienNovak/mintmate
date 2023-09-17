'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Votings', [
      {
        title: 'Best Album of 2023',
        description: 'Vote for your favorite album released in 2023.',
        deadline: new Date('2023-12-31'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Most Anticipated Collaboration',
        description: 'Which two artists do you wish to see collaborate in 2024?',
        deadline: new Date('2023-11-30'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ... other voting records as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Votings', null, {});
  }
};
