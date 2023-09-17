'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EquipmentRentals', [
      {
        itemName: 'Camera Model XYZ',
        description: 'High-definition camera suitable for videography.',
        dailyRate: 20.50,
        availableFrom: new Date('2023-09-01'),
        availableTo: new Date('2023-12-31'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        itemName: 'Sound Mixer ABC',
        description: '8-channel sound mixer for audio recording.',
        dailyRate: 15.75,
        availableFrom: new Date('2023-09-10'),
        availableTo: new Date('2023-11-20'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ... add more items as desired
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EquipmentRentals', null, {});
  }
};
