'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch album IDs based on their titles
    const albums = await queryInterface.sequelize.query(
      `SELECT id, title FROM "Albums" WHERE title IN ('Journey Through Sound', 'Melodic Waves', 'Echoes of the Past')`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (!albums || albums.length !== 3) {
      throw new Error('Did not retrieve the expected albums.');
    }
    
    const journeyAlbumId = albums.find(album => album.title === 'Journey Through Sound').id;
    const melodicWavesAlbumId = albums.find(album => album.title === 'Melodic Waves').id;
    const echoesAlbumId = albums.find(album => album.title === 'Echoes of the Past').id;

    // Fetch virtual stages by their names
    const stages = await queryInterface.sequelize.query(
      `SELECT id, name FROM "VirtualVenues" WHERE name IN ('Digital Dome', 'Cyber Concert Hall')`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (!stages || stages.length !== 2) {
      throw new Error('Did not retrieve the expected virtual venues.');
    }

    const digitalDomeId = stages.find(stage => stage.name === 'Digital Dome').id;
    const cyberConcertHallId = stages.find(stage => stage.name === 'Cyber Concert Hall').id;

    await queryInterface.bulkInsert('AlbumListeningParties', [
      {
        albumId: journeyAlbumId,
        date: new Date('2023-09-01T19:00:00.000Z'),
        virtualStageId: digitalDomeId,
      },
      {
        albumId: melodicWavesAlbumId,
        date: new Date('2023-09-05T20:00:00.000Z'),
        virtualStageId: cyberConcertHallId,
      },
      {
        albumId: echoesAlbumId,
        date: new Date('2023-09-10T21:00:00.000Z'),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('AlbumListeningParties', null, {});
  }
};
