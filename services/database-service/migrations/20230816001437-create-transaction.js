'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Transactions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            type: {
                type: Sequelize.ENUM('buy', 'sell', 'deposit', 'withdrawal'),
                allowNull: false
            },
            amount: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM('pending', 'completed', 'failed'),
                allowNull: false
            },
            currency: {
                type: Sequelize.STRING,
                allowNull: false
            },
            txHash: {
                type: Sequelize.STRING
            },
            blockchain: {
                type: Sequelize.STRING
            },
            fromAddress: {
                type: Sequelize.STRING
            },
            toAddress: {
                type: Sequelize.STRING
            },
            fee: {
                type: Sequelize.FLOAT
            },
            blockchainTimestamp: {
                type: Sequelize.DATE
            },
            details: {
                type: Sequelize.TEXT
            },
            nftEdition: {
                type: Sequelize.STRING
            },
            counterpartyId: {
                type: Sequelize.INTEGER
            },
            relatedTransactionId: {
                type: Sequelize.INTEGER
            },
            transactionCategory: {
                type: Sequelize.ENUM('standard', 'promotion', 'adjustment')
            },
            priority: {
                type: Sequelize.ENUM('low', 'medium', 'high')
            },
            scheduledTime: {
                type: Sequelize.DATE
            },
            expirationTime: {
                type: Sequelize.DATE
            },
            apiKeyHash: {
                type: Sequelize.STRING
            },
            isDeleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Transactions');
    }
};
