'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('VirtualInstruments', [{
      name: 'Digital Piano',
      soundSampleUrl: 'https://example.com/sounds/digital_piano.mp3',
      price: 99.00,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Synthetic Drum Kit',
      soundSampleUrl: 'https://example.com/sounds/drum_kit.mp3',
      price: 120.00,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Virtual Violin',
      soundSampleUrl: 'https://example.com/sounds/violin.mp3',
      price: 150.00,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('VirtualInstruments', null, {});
  }
};
