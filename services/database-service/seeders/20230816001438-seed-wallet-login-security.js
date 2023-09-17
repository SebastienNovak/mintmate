'use strict';
const WalletBasicInfo = require('../models/walletBasicInfos');  // Ensure the path points to your WalletBasicInfo model.

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch all wallets or specific wallets you want to seed security info for
    const wallets = await queryInterface.sequelize.query('SELECT * FROM "WalletBasicInfos"', { type: queryInterface.sequelize.QueryTypes.SELECT });


    // Ensure there are enough wallets to seed the security info
    if (wallets.length < 2) throw new Error("Not enough wallets to seed WalletLoginSecurities");

    return queryInterface.bulkInsert('WalletLoginSecurities', [
      {
        failedLoginAttempts: 2,
        lastFailedLogin: new Date(),
        walletId: wallets[0].id,  // Using the ID of the first wallet
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        failedLoginAttempts: 1,
        lastFailedLogin: new Date(),
        walletId: wallets[1].id,  // Using the ID of the second wallet
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ... other security records as needed, following the dynamic approach
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('WalletLoginSecurities', null, {});
  }
};
