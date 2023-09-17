'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Chats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      senderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',  // NOTE: Ensure 'Users' is the correct table name
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      receiverId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',  // NOTE: Ensure 'Users' is the correct table name
          key: 'id'
        },
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('Chats');
  }
};
