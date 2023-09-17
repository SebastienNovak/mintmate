'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const passwordHash = await bcrypt.hash('password123', 10); // Hashing a sample password

    return queryInterface.bulkInsert('Users', [{
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: passwordHash,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      password: passwordHash,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Alex Morgan',
      email: 'alexmorgan@example.com',
      password: passwordHash,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Alice Wonderland',
      email: 'alice@example.com',
      password: passwordHash,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Bob Builder',
      email: 'bob@example.com',
      password: passwordHash,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
