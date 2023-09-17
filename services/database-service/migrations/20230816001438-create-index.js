module.exports = {
    up: async (queryInterface, Sequelize) => {
      // Create Users table
      await queryInterface.createTable('Users', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        // ... other properties for the User model ...
  
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        }
      });
  
      // Create NFTs table
      await queryInterface.createTable('NFTs', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        // ... other properties for the NFT model ...
  
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users', 
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
  
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        }
      });
      
      // Continue creating other tables for other models ...
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('NFTs');
      await queryInterface.dropTable('Users');
      // Drop other tables in reverse order ...
    }
  };
  