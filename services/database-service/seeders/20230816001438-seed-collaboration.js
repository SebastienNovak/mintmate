'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch artist IDs from the Artists table
    const artists = await queryInterface.sequelize.query(
      `SELECT id FROM "ArtistProfiles" LIMIT 3`, 
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (artists.length < 3) {
      console.log("Not enough artists found. Cannot seed Collaborations without the required artists.");
      return;
    }

    // Fetch track IDs from the Tracks table
    const tracks = await queryInterface.sequelize.query(
      `SELECT id FROM "Tracks" LIMIT 1`, 
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (tracks.length < 1) {
      console.log("Not enough tracks found. Cannot seed Collaborations without the required tracks.");
      return;
    }

    // Fetch album IDs from the Albums table
    const albums = await queryInterface.sequelize.query(
      `SELECT id FROM "Albums" LIMIT 1`, 
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (albums.length < 1) {
      console.log("Not enough albums found. Cannot seed Collaborations without the required albums.");
      return;
    }

    return queryInterface.bulkInsert('Collaborations', [
      {
        role: 'Vocalist',
        artistId: artists[0].id,
        trackId: tracks[0].id,
        albumId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role: 'Producer',
        artistId: artists[1].id,
        trackId: tracks[0].id,
        albumId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        role: 'Guitarist',
        artistId: artists[2].id,
        trackId: null,
        albumId: albums[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Collaborations', null, {});
  }
};
