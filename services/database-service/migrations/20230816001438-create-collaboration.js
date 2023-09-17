'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Collaborations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
      },
      artistId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',  // NOTE: Ensure 'Users' is the correct table name
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      trackId: {
        type: Sequelize.INTEGER,
        allowNull: true,  // Assuming a collaboration might not always be associated with a track
        references: {
          model: 'Tracks',  // NOTE: Ensure 'Tracks' is the correct table name
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      albumId: {
        type: Sequelize.INTEGER,
        allowNull: true,  // Assuming a collaboration might not always be associated with an album
        references: {
          model: 'Albums',  // NOTE: Ensure 'Albums' is the correct table name
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
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
    await queryInterface.dropTable('Collaborations');
  }
};
