'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Get the IDs of the two most recently inserted tracks
    const insertedTracks = await queryInterface.sequelize.query(
      `SELECT id FROM "Tracks" ORDER BY "createdAt" DESC LIMIT 2`, 
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (!insertedTracks || insertedTracks.length !== 2) {
      throw new Error('Unexpected number of tracks retrieved.');
    }

    // 2. Get the genre IDs for Rock and Pop
    const genres = await queryInterface.sequelize.query(
      `SELECT id, name FROM "Genres" WHERE name IN ('Rock', 'Pop')`, 
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (!genres || genres.length < 2) {
      throw new Error('Did not retrieve the expected genres.');
    }

    const rockGenre = genres.find(g => g.name === 'Rock');
    const popGenre = genres.find(g => g.name === 'Pop');

    if (!rockGenre || !popGenre) {
      throw new Error('Expected genres were not found.');
    }

    // Sort tracks ascendingly to match the order they were inserted in
    const sortedTracks = insertedTracks.sort((a, b) => a.id - b.id);
    
    // 3. Insert relationships into the TrackGenres table using the queried track and genre IDs
    await queryInterface.bulkInsert('TrackGenres', [
      {
        genreId: rockGenre.id,
        trackId: sortedTracks[0].id
      },
      {
        genreId: popGenre.id,
        trackId: sortedTracks[1].id
      },
      {
        genreId: rockGenre.id,
        trackId: sortedTracks[1].id
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TrackGenres', null, {});
  }
};
