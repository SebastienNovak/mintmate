'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    // Fetch Transaction IDs from the Transactions table
    const transactions = await queryInterface.sequelize.query(
      `SELECT id FROM "Transactions" LIMIT 2`, 
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (transactions.length < 2) {
      console.log("Not enough transactions found. Cannot seed Disputes without the required transactions.");
      return;
    }

    return queryInterface.bulkInsert('Disputes', [
      {
        disputeStatus: 'raised',
        disputeDetails: 'Issue with transaction XYZ',
        transactionId: transactions[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        disputeStatus: 'pending',
        disputeDetails: 'Problem with payment for ABC',
        transactionId: transactions[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      //... add as many objects as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Disputes', null, {});
  }
};
