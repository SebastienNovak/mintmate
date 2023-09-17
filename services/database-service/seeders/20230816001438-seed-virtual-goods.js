'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('VirtualGoods', [{
      name: 'Rockstar Outfit',
      description: 'A cool rockstar outfit for avatars.',
      price: 50.00,
      type: 'avatar_outfit',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Guitar Prop',
      description: 'A virtual guitar prop for avatars.',
      price: 30.00,
      type: 'avatar_outfit',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Concert Spotlight',
      description: 'A virtual spotlight for virtual concerts.',
      price: 150.00,
      type: 'concert_prop',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('VirtualGoods', null, {});
  }
};
