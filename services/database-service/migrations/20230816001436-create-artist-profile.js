'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ArtistProfiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false,
        unique: true
      },
      biography: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      genre: {
        type: Sequelize.STRING,
        allowNull: true
      },
      albumsReleased: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      websiteUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      socialMediaLinks: {
        type: Sequelize.JSON,
        allowNull: true
      },
      profileImage: {
        type: Sequelize.STRING,
        allowNull: true
      },
      discography: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      accolades: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      bannerUrl: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.addIndex('ArtistProfiles', ['userId']);
    await queryInterface.addIndex('ArtistProfiles', ['genre']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ArtistProfiles');
  }
};
