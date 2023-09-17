'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('WalletSecurities', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        privateKeyEncrypted: Sequelize.STRING,
        status: Sequelize.ENUM('active', 'inactive', 'suspended'),
        twoFactorEnabled: Sequelize.BOOLEAN,
        twoFactorSecret: Sequelize.STRING,
        encryptedPIN: Sequelize.STRING,
        backupPhraseEncrypted: Sequelize.STRING,
        securityQuestions: Sequelize.JSON,
        securityAnswersEncrypted: Sequelize.JSON,
        fingerprintEnabled: Sequelize.BOOLEAN,
        walletId: {
            type: Sequelize.INTEGER,
            references: {
            model: 'WalletBasicInfos',
            key: 'id'
            },
            onDelete: 'CASCADE'
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('WalletSecurities');
    }
};
