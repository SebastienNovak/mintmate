'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Challenges', [
      {
        title: 'Design a New Logo',
        description: 'Create a new and innovative logo for our brand. It should be modern, fresh and align with our company values.',
        deadline: new Date('2023-09-30'),
        prize: '$500 Amazon Gift Card',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Eco-Friendly Campaign',
        description: 'Design a campaign promoting eco-friendly habits. Include a poster, video, and a slogan.',
        deadline: new Date('2023-10-15'),
        prize: 'Apple iPad Pro',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Challenges', null, {});
  }
};
