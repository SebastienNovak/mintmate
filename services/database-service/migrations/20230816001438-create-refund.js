'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Refunds', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            refundStatus: {
                type: Sequelize.ENUM('not_requested', 'pending', 'completed', 'denied'),
                allowNull: false
            },
            refundAmount: {
                type: Sequelize.FLOAT
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
        await queryInterface.dropTable('Refunds');
    }
};
