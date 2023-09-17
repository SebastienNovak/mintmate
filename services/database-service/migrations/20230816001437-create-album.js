'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Albums', {
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
      releaseDate: {
        type: Sequelize.DATE
      },
      coverArt: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'ArtistProfiles', // name of the table, make sure it's correct
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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

    // If you're using a DB that supports it, add an index for performance
    await queryInterface.addIndex('Albums', ['userId']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Albums');
  }
};
