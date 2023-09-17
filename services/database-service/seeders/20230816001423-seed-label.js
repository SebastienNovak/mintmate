'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Labels', [
      {
        name: 'Warner Bros. Records',
        description: 'An American major record label established in 1958 as the foundation label of the present-day Warner Music Group (WMG), and now operates as a wholly owned subsidiary of that corporation.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Universal Music Group',
        description: 'A global music corporation that is majority owned by the French media conglomerate Vivendi, with Chinese tech company Tencent owning a minority stake.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sony Music Entertainment',
        description: 'An American global music company, which is a subsidiary of Japanese conglomerate Sony Corporation.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Columbia Records',
        description: 'An American record label owned by Sony Music Entertainment, a subsidiary of Sony Corporation of America.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Atlantic Records',
        description: 'An American record label founded in 1947. It is a subsidiary of Warner Music Group and operates as its flagship label.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ... add more labels as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Labels', null, {});
  }
};
