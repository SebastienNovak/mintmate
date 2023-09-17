'use strict';
const { User } = require('../models/user');  // Make sure the path is correctly pointing to your User model.

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch all users or the specific users you want
    const users = await queryInterface.sequelize.query('SELECT * FROM "Users"', { type: queryInterface.sequelize.QueryTypes.SELECT });

    // Check if there are enough users to seed the wallet info
    if (users.length < 2) throw new Error("Not enough users to seed WalletBasicInfos");

    return queryInterface.bulkInsert('WalletBasicInfos', [
      {
        balance: 100.00,
        currency: 'BTC',
        address: 'sampleAddress1',
        publicKey: 'samplePublicKey1',
        isColdStorage: false,
        multisigAddresses: ['sampleMultiSigAddress1A', 'sampleMultiSigAddress1B'],
        hardwareWalletType: 'Ledger',
        userId: users[0].id,  // Using the ID of the first user
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        balance: 50.00,
        currency: 'ETH',
        address: 'sampleAddress2',
        publicKey: 'samplePublicKey2',
        isColdStorage: true,
        multisigAddresses: null, 
        hardwareWalletType: null,
        userId: users[1].id,  // Using the ID of the second user
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ... other wallet records as needed using similar dynamic methods
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('WalletBasicInfos', null, {});
  }
};
