'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch the first 2 event IDs from the Events table
    const events = await queryInterface.sequelize.query(
      'SELECT id FROM "Events" LIMIT 2',
      {
        type: Sequelize.QueryTypes.SELECT
      }
    );

    if (events.length < 2) {
      console.error("Not enough events in the database to seed Tickets!");
      return;
    }

    // Seed the Tickets using the fetched event IDs
    return queryInterface.bulkInsert('Tickets', [
      {
        type: "Standard",
        price: 45.00,
        availableCount: 100,
        purchaseDate: null,
        seatNumber: null,
        soldCount: 0,
        eventId: events[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: "VIP",
        price: 150.00,
        availableCount: 50,
        purchaseDate: null,
        seatNumber: null,
        soldCount: 0,
        eventId: events[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: "Front Row",
        price: 200.00,
        availableCount: 10,
        purchaseDate: null,
        seatNumber: null,
        soldCount: 0,
        eventId: events[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tickets', null, {});
  }
};
