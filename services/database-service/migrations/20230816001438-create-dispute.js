'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Disputes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            disputeStatus: {
                type: Sequelize.ENUM('raised', 'resolved', 'pending'),
                allowNull: false
            },
            disputeDetails: {
                type: Sequelize.TEXT
            },
            resolvedOn: {
                type: Sequelize.DATE
            },
            resolutionDetails: {
                type: Sequelize.TEXT
            },
            transactionId: { // foreign key for Transaction
                type: Sequelize.INTEGER,
                references: {
                    model: 'Transactions',
                    key: 'id'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
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
        await queryInterface.dropTable('Disputes');
    }
};
