'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('NFTs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      imageUrl: Sequelize.STRING,
      metadataUrl: Sequelize.STRING,
      edition: Sequelize.STRING,
      totalEditions: Sequelize.INTEGER,
      isForSale: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      price: Sequelize.FLOAT,
      dateMinted: Sequelize.DATE,
      dateListed: Sequelize.DATE,
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      category: Sequelize.STRING,
      tokenID: Sequelize.STRING,
      blockchainType: Sequelize.STRING,
      contractAddress: Sequelize.STRING,
      attributes: Sequelize.JSONB,
      isVisible: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      fileType: Sequelize.STRING,
      audioUrl: Sequelize.STRING,
      videoPreviewUrl: Sequelize.STRING,
      licenseType: Sequelize.STRING,
      hasPhysicalRedemption: Sequelize.BOOLEAN,
      physicalRedemptionDetails: Sequelize.TEXT,
      isOnAuction: Sequelize.BOOLEAN,
      auctionStartTime: Sequelize.DATE,
      auctionEndTime: Sequelize.DATE,
      startingBid: Sequelize.FLOAT,
      highestBid: Sequelize.FLOAT,
      highestBidderId: Sequelize.INTEGER,
      isVerified: Sequelize.BOOLEAN,
      reservePrice: Sequelize.FLOAT,
      unlockableContentUrl: Sequelize.STRING,
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('NFTs');
  }
};
