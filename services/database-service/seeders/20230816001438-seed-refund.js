'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch transaction IDs from the Transactions table
    const transactions = await queryInterface.sequelize.query(
      `SELECT id FROM "Transactions" LIMIT 4`,  // Fetching the first 4 transaction IDs for this example
      {
        type: Sequelize.QueryTypes.SELECT
      }
    );

    if (transactions.length < 4) {
      console.error("Not enough transactions in the database to seed Refunds!");
      return;
    }

    // Using the fetched IDs to seed Refunds
    return queryInterface.bulkInsert('Refunds', [
      {
        refundStatus: 'not_requested',
        refundAmount: null,  // Not set since status is 'not_requested'
        transactionId: transactions[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        refundStatus: 'pending',
        refundAmount: 50.00,
        transactionId: transactions[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        refundStatus: 'completed',
        refundAmount: 100.00,
        transactionId: transactions[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        refundStatus: 'denied',
        refundAmount: 75.00,
        transactionId: transactions[3].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Refunds', null, {});
  }
};
