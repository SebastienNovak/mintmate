'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ticketPrice: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      artistId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'ArtistProfiles', // The table name should be pluralized as per Sequelize's convention
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Events');
  }
};
