'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Workshops', [
      {
        title: 'Introduction to Painting',
        description: 'A beginner workshop for those interested in painting.',
        date: new Date('2023-09-15'),
        fee: 50.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Advanced Sculpting Techniques',
        description: 'For experienced artists looking to refine their sculpting skills.',
        date: new Date('2023-10-10'),
        fee: 150.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ... add more records as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Workshops', null, {});
  }
};
