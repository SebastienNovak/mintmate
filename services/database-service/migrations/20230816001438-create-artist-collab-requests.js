'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ArtistCollabRequests', {
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
          model: 'ArtistProfiles', // Assuming you have an 'Artists' table for this foreign key reference.
          key: 'id'
        }
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      isOpen: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true // Assuming by default a collaboration request is open.
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
    await queryInterface.addIndex('ArtistCollabRequests', ['artistId']);
    await queryInterface.addIndex('ArtistCollabRequests', ['isOpen']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ArtistCollabRequests');
  }
};
