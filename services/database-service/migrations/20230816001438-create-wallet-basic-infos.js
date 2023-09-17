'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('WalletBasicInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      balance: Sequelize.FLOAT,
      currency: Sequelize.STRING,
      address: Sequelize.STRING,
      publicKey: Sequelize.STRING,
      isColdStorage: Sequelize.BOOLEAN,
      multisigAddresses: Sequelize.ARRAY(Sequelize.STRING),
      hardwareWalletType: Sequelize.STRING,
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
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
    await queryInterface.dropTable('WalletBasicInfos');
  }
};
