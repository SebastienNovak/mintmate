'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ArtistEndorsements', [
      {
        brandName: 'BrandA',
        product: 'Guitar Model Z',
        description: 'A signature series of electric guitars.',
        endorsementDate: new Date('2023-01-15'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        brandName: 'BrandB',
        product: 'Amplifier X',
        description: 'A high-end amplifier with crystal clear sound.',
        endorsementDate: new Date('2023-05-20'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ... other endorsement records as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ArtistEndorsements', null, {});
  }
};
