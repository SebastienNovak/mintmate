'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch User IDs from the Users table
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" LIMIT 2`, 
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (users.length < 2) {
      console.log("Not enough users found. Cannot seed CustomizedMerches without the required users.");
      return;
    }

    // Fetch Merch IDs from the Merches table
    const merches = await queryInterface.sequelize.query(
      `SELECT id FROM "Merchandises" LIMIT 2`, 
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (merches.length < 2) {
      console.log("Not enough merches found. Cannot seed CustomizedMerches without the required merch items.");
      return;
    }

    return queryInterface.bulkInsert('CustomizedMerches', [
      {
        userId: users[0].id, 
        merchId: merches[0].id,
        customizations: {
          color: 'red',
          size: 'M',
          design: 'front_logo'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: users[1].id,
        merchId: merches[1].id,
        customizations: {
          color: 'blue',
          size: 'L',
          design: 'side_print'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CustomizedMerches', null, {});
  }
};
