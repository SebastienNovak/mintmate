'use strict';
const WalletBasicInfo = require('../models/walletBasicInfos');  // Adjust the path to point to your WalletBasicInfo model.

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch all wallets or specific wallets you want to seed security info for
    const wallets = await queryInterface.sequelize.query('SELECT * FROM "WalletBasicInfos"', { type: queryInterface.sequelize.QueryTypes.SELECT });

    // Ensure there are enough wallets to seed the security info
    if (!wallets || wallets.length === 0) throw new Error("No wallets found to seed WalletSecurities");

    return queryInterface.bulkInsert('WalletSecurities', [
      {
        privateKeyEncrypted: 'encryptedPrivateKey1',
        status: 'active',
        twoFactorEnabled: true,
        twoFactorSecret: 'secret1',
        encryptedPIN: 'encryptedPin1',
        backupPhraseEncrypted: 'encryptedBackupPhrase1',
        securityQuestions: JSON.stringify({
          "question1": "Your first pet's name?",
          "question2": "Mother's maiden name?"
        }),
        securityAnswersEncrypted: JSON.stringify({
          "answer1": "encryptedAnswer1",
          "answer2": "encryptedAnswer2"
        }),
        fingerprintEnabled: true,
        walletId: wallets[0].id,  // Using the ID of the first wallet
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ... other security records as needed, following the dynamic approach
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('WalletSecurities', null, {});
  }
};
