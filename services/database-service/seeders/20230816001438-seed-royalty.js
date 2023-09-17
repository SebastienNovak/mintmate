'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch the first 3 NFT IDs from the NFTs table
    const nfts = await queryInterface.sequelize.query(
      'SELECT id FROM "NFTs" LIMIT 3',
      {
        type: Sequelize.QueryTypes.SELECT
      }
    );

    if (nfts.length < 3) {
      console.error("Not enough NFTs in the database to seed Royalties!");
      return;
    }

    // Fetch the first 3 artist IDs (Users) from the Users table
    const artists = await queryInterface.sequelize.query(
      'SELECT id FROM "Users" WHERE role = \'artist\' LIMIT 3',  // Assuming there's a role column in Users table distinguishing artists
      {
        type: Sequelize.QueryTypes.SELECT
      }
    );

    if (artists.length < 3) {
      console.error("Not enough artists in the database to seed Royalties!");
      return;
    }

    // Seed the Royalties using the fetched IDs
    return queryInterface.bulkInsert('Royalties', [
      {
        percentage: 10.5,
        amount: 100.5,
        nftId: nfts[0].id,
        artistId: artists[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        percentage: 5.5,
        amount: 50.5,
        nftId: nfts[1].id,
        artistId: artists[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        percentage: 12.5,
        amount: 120.5,
        nftId: nfts[2].id,
        artistId: artists[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Royalties', null, {});
  }
};
