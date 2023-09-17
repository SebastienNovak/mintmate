'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch transaction IDs from the Transactions table
    const transactions = await queryInterface.sequelize.query(
      `SELECT id FROM "Transactions" LIMIT 2`, // This gets the IDs of the first two transactions. Adjust as necessary.
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Check if the required number of transactions were found
    if (transactions.length < 2) {
      console.log("Not enough transactions found. Cannot seed BlockchainDatas without the required transactions.");
      return;
    }

    return queryInterface.bulkInsert('BlockchainDatas', [
      {
        gasFee: 0.002,
        gasPrice: 30.00,
        tokenContractAddress: '0x1234567890abcdef1234567890abcdef12345678',
        exchangeRate: 1.5,
        escrowStatus: 'not_in_escrow',
        failureReason: null,
        TransactionId: transactions[0].id, // Dynamically set TransactionId
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        gasFee: 0.003,
        gasPrice: 31.00,
        tokenContractAddress: '0xabcdef1234567890abcdef1234567890abcdef1234',
        exchangeRate: 1.6,
        escrowStatus: 'in_escrow',
        failureReason: null,
        TransactionId: transactions[1].id, // Dynamically set TransactionId
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BlockchainDatas', null, {});
  }
};
