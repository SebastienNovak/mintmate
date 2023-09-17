'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch User IDs from the Users table
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" LIMIT 3`, 
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (users.length < 3) {
      console.log("Not enough users found. Cannot seed Comments without the required users.");
      return;
    }

    // Fetch NFT IDs based on the comment type
    const nfts = await queryInterface.sequelize.query(
      `SELECT id FROM "NFTs" LIMIT 1`, 
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (nfts.length < 1) {
      console.log("Not enough NFTs found. Cannot seed Comments without the required NFTs.");
      return;
    }

    // Fetch Album IDs based on the comment type
    const albums = await queryInterface.sequelize.query(
      `SELECT id FROM "Albums" LIMIT 1`, 
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (albums.length < 1) {
      console.log("Not enough albums found. Cannot seed Comments without the required albums.");
      return;
    }

    // Fetch Event IDs based on the comment type
    const events = await queryInterface.sequelize.query(
      `SELECT id FROM "Events" LIMIT 1`, 
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (events.length < 1) {
      console.log("Not enough events found. Cannot seed Comments without the required events.");
      return;
    }

    return queryInterface.bulkInsert('Comments', [
      {
        content: 'Amazing NFT!',
        type: 'nft',
        userId: users[0].id,
        nftId: nfts[0].id,
        albumId: null,
        eventId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'This album is legendary.',
        type: 'album',
        userId: users[1].id,
        nftId: null,
        albumId: albums[0].id,
        eventId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'Can\'t wait for this event!',
        type: 'event',
        userId: users[2].id,
        nftId: null,
        albumId: null,
        eventId: events[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  }
};
