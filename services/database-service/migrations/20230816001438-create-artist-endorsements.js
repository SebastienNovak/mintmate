'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ArtistEndorsements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      artistId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         
          model: 'ArtistProfiles',
          key: 'id'
        }
      },
      brandName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      product: {
        type: Sequelize.STRING,
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      endorsementDate: {
        type: Sequelize.DATE,
        allowNull: false
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

    // Consider adding indexes for performance on frequently queried columns
    await queryInterface.addIndex('ArtistEndorsements', ['brandName']);
    await queryInterface.addIndex('ArtistEndorsements', ['endorsementDate']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ArtistEndorsements');
  }
};
