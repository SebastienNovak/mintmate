'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('FanExperiences', [{
      title: 'Concert Behind the Scenes',
      description: 'Get an exclusive look behind the scenes of our latest concert.',
      price: 150.00,
      date: new Date('2023-09-20'),
      location: 'Los Angeles, CA',
      virtualLink: 'http://example.com/virtual-concert',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      title: 'Meet and Greet',
      description: 'Have a virtual coffee chat with the band.',
      price: 300.00,
      date: new Date('2023-10-05'),
      location: 'Virtual',
      virtualLink: 'http://example.com/meet-greet',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('FanExperiences', null, {});
  }
};
