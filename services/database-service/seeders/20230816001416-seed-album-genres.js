'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    // Fetch album IDs based on their titles
    const albums = await queryInterface.sequelize.query(
      `SELECT id, title FROM "Albums" WHERE title IN ('Journey Through Sound', 'Melodic Waves')`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    const journeyAlbumId = albums.find(album => album.title === 'Journey Through Sound').id;
    const melodicWavesAlbumId = albums.find(album => album.title === 'Melodic Waves').id;

    // Fetch genre IDs based on a unique attribute (in this case, let's assume you have a 'name' column for genres)
    // Make sure to adjust this as per your schema if there is no 'name' column.
    const genres = await queryInterface.sequelize.query(
      `SELECT id, name FROM "Genres" WHERE name IN ('Rock', 'Pop', 'Jazz')`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const rockGenreId = genres.find(genre => genre.name === 'Rock').id;
    const popGenreId = genres.find(genre => genre.name === 'Pop').id;
    const jazzGenreId = genres.find(genre => genre.name === 'Jazz').id;

    await queryInterface.bulkInsert('AlbumGenres', [
      {
        genreId: rockGenreId,
        albumId: journeyAlbumId,
      },
      {
        genreId: popGenreId,
        albumId: journeyAlbumId,
      },
      {
        genreId: jazzGenreId,
        albumId: melodicWavesAlbumId,
      },
      // ... add more associations as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('AlbumGenres', null, {});
  }
};
