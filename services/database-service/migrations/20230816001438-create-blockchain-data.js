'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('BlockchainDatas', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            gasFee: {
                type: Sequelize.FLOAT
            },
            gasPrice: {
                type: Sequelize.FLOAT
            },
            tokenContractAddress: {
                type: Sequelize.STRING
            },
            exchangeRate: {
                type: Sequelize.FLOAT
            },
            escrowStatus: {
                type: Sequelize.ENUM('not_in_escrow', 'in_escrow', 'released', 'refunded')
            },
            failureReason: {
                type: Sequelize.TEXT
            },
            TransactionId: {  // Foreign Key 
                type: Sequelize.INTEGER,
                references: {
                    model: 'Transactions', // The table name in the database
                    key: 'id'
                },
                allowNull: false
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
        await queryInterface.dropTable('BlockchainDatas');
    }
};
