'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch the first transaction ID from the Transactions table
    const transactions = await queryInterface.sequelize.query(
      'SELECT id FROM "Transactions" LIMIT 1',
      {
        type: Sequelize.QueryTypes.SELECT
      }
    );

    if (!transactions.length) {
      console.error("No transactions in the database to attach metadata!");
      return;
    }

    // Seed the TransactionMetas using the fetched transaction ID
    return queryInterface.bulkInsert('TransactionMetas', [
      {
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0',
        transactionNote: 'First Transaction',
        previousStatus: 'pending',
        internalNotes: 'Handled by agent A.',
        attachments: JSON.stringify([{name: 'invoice1.pdf', url: 'http://example.com/invoice1.pdf'}]),
        externalReferences: JSON.stringify([{type: 'Invoice', id: 'INV001'}]),
        verificationCode: '123456',
        auditTrail: JSON.stringify([{event: 'Created', time: '2023-08-15T12:00:00Z'}]),
        twoFactorAuthUsed: true,
        sessionId: 'session123',
        geoLocation: JSON.stringify({lat: 40.7128, long: -74.0060}),
        digitalSignature: 'signature123',
        promoCode: 'PROMO10',
        transactionId: transactions[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Add more sample meta data as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TransactionMetas', null, {});
  }
};
