'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users"`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const nfts = await queryInterface.sequelize.query(
      `SELECT id FROM "NFTs"`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (!users.length || !nfts.length) {
      throw new Error('No users or NFTs to seed bids.');
    }

    console.log(users.length);
    console.log(nfts.length);

    if (users.length < 3 || nfts.length < 2) {
      throw new Error('Not enough users or NFTs to seed bids.');
    }

    const bids = [
      {
        userId: users[0].id,
        nftId: nfts[0].id,
        amount: 500.00,
        status: 'open',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: users[1].id,
        nftId: nfts[0].id,
        amount: 550.00,
        status: 'open',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: users[2].id,
        nftId: nfts[1].id,
        amount: 250.00,
        status: 'rejected',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    return queryInterface.bulkInsert('Bids', bids, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Bids', null, {});
  }
};
