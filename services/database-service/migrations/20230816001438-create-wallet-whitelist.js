'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('WalletWhitelists', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        whitelistAddresses: Sequelize.ARRAY(Sequelize.STRING),
        ipWhitelist: Sequelize.ARRAY(Sequelize.STRING),
        userAgentWhitelist: Sequelize.ARRAY(Sequelize.STRING),
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
        await queryInterface.dropTable('WalletWhitelists');
    }
};
