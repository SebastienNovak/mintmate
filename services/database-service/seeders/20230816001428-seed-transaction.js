'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Transactions', [{
      type: 'deposit',
      amount: 1000.00,
      status: 'completed',
      currency: 'USD',
      txHash: '0x12345abcde',
      blockchain: 'Ethereum',
      fromAddress: '0xabcdef123456',
      toAddress: '0x123456abcdef',
      fee: 1.50,
      blockchainTimestamp: new Date(),
      details: 'Initial deposit',
      nftEdition: null,
      counterpartyId: null,
      relatedTransactionId: null,
      transactionCategory: 'standard',
      priority: 'medium',
      scheduledTime: null,
      expirationTime: null,
      apiKeyHash: null,
      isDeleted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Transactions', null, {});
  }
};
