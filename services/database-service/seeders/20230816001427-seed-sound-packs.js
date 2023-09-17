'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserting some sample data into the SoundPacks table
    await queryInterface.bulkInsert('SoundPacks', [
      {
        name: "Epic Sound Pack",
        description: "A collection of epic sounds for your project.",
        price: 19.99,
        sampleUrls: ['sample1.mp3', 'sample2.mp3', 'sample3.mp3'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Relaxing Sound Pack",
        description: "A collection of relaxing sounds for meditation.",
        price: 14.99,
        sampleUrls: ['relax1.mp3', 'relax2.mp3'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Retro Game Sound Pack",
        description: "Classic game sounds from the 80s and 90s.",
        price: 9.99,
        sampleUrls: ['game1.mp3', 'game2.mp3', 'game3.mp3', 'game4.mp3'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SoundPacks', null, {});
  }
};
