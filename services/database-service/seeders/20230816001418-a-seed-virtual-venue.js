'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('VirtualVenues', [
      {
        name: 'Digital Dome',
        description: 'A virtual venue with an immersive 360° digital experience.',
        capacity: 5000,
        virtualLink: 'https://virtualvenues.com/digitaldome',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cyber Concert Hall',
        description: 'High-quality audio and visuals make this the ultimate online concert destination.',
        capacity: 8000,
        virtualLink: 'https://virtualvenues.com/cyberconcerthall',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pixel Plaza',
        description: 'A relaxed virtual venue for smaller performances and events.',
        capacity: 1500,
        virtualLink: 'https://virtualvenues.com/pixelplaza',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('VirtualVenues', null, {});
  }
};
