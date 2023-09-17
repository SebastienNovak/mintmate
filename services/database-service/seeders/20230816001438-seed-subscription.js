'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserting some sample data into the Subscriptions table
    await queryInterface.bulkInsert('Subscriptions', [
      {
        name: "Basic",
        price: 4.99,
        benefits: "Access to standard music collections and no ads.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Premium",
        price: 9.99,
        benefits: "Access to all music collections, no ads, and offline listening.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Family Pack",
        price: 14.99,
        benefits: "All Premium benefits for up to 5 family members.",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Subscriptions', null, {});
  }
};
