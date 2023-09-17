'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tracks', {
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
      duration: {
        type: Sequelize.INTEGER
      },
      streamUrl: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING
      },
      audioFile: {
        type: Sequelize.STRING
      },
      featuredArtists: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      isNFT: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      price: {
        type: Sequelize.FLOAT
      },
      albumId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Albums',
          key: 'id'
        },
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('Tracks');
  }
};
