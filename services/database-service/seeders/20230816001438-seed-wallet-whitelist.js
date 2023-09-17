'use strict';
const WalletBasicInfo = require('../models/walletBasicInfos');  // Adjust the path to point to your WalletBasicInfo model.

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch all wallets or specific wallets you want to seed whitelist info for
    const wallets = await queryInterface.sequelize.query('SELECT * FROM "WalletBasicInfos"', { type: queryInterface.sequelize.QueryTypes.SELECT });

    // Ensure there are enough wallets to seed the whitelist info
    if (!wallets || wallets.length === 0) throw new Error("No wallets found to seed WalletWhitelists");

    return queryInterface.bulkInsert('WalletWhitelists', [
      {
        whitelistAddresses: ['0x1234567890abcdef1234567890abcdef12345678', '0xabcdef1234567890abcdef1234567890abcdef1234'],
        ipWhitelist: ['192.168.1.1', '10.0.0.1'],
        userAgentWhitelist: ['Mozilla/5.0', 'Chrome/91.0'],
        walletId: wallets[0].id,  // Using the ID of the first wallet
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ... other whitelist records as needed, following the dynamic approach
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('WalletWhitelists', null, {});
  }
};
