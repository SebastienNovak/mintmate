'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('TransactionMetas', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            ipAddress: {
                type: Sequelize.STRING
            },
            userAgent: {
                type: Sequelize.STRING
            },
            transactionNote: {
                type: Sequelize.TEXT
            },
            previousStatus: {
                type: Sequelize.ENUM('pending', 'completed', 'failed')
            },
            internalNotes: {
                type: Sequelize.TEXT
            },
            attachments: {
                type: Sequelize.JSON
            },
            externalReferences: {
                type: Sequelize.JSON
            },
            verificationCode: {
                type: Sequelize.STRING
            },
            auditTrail: {
                type: Sequelize.JSON
            },
            twoFactorAuthUsed: {
                type: Sequelize.BOOLEAN
            },
            sessionId: {
                type: Sequelize.STRING
            },
            geoLocation: {
                type: Sequelize.JSON
            },
            digitalSignature: {
                type: Sequelize.STRING
            },
            promoCode: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('TransactionMetas');
    }
};
