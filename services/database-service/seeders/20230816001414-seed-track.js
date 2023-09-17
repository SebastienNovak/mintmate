module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    // 1. Query the Albums table to get an existing albumId.
    // For the sake of this example, I'm fetching the first album's ID.
    // Adjust this as needed if you want to link to a specific album.
    const albums = await queryInterface.sequelize.query(
      `SELECT id FROM "Albums" LIMIT 1`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (!albums || albums.length === 0) {
      throw new Error('No albums found to associate with tracks.');
    }

    const albumId = albums[0].id;

    // 2. Use the retrieved albumId for your Tracks data.
    await queryInterface.bulkInsert('Tracks', [
      {
        title: 'Sample Track 1',
        duration: 240, // 4 minutes in seconds
        streamUrl: 'http://example.com/sample-track-1',
        genre: 'Rock',
        audioFile: 'sample-track-1.mp3',
        featuredArtists: ['Artist A', 'Artist B'],
        isNFT: false,
        price: 1.99,
        albumId: albumId,
        createdAt: now,
        updatedAt: now
      },
      {
        title: 'Sample Track 2',
        duration: 180, // 3 minutes in seconds
        streamUrl: 'http://example.com/sample-track-2',
        genre: 'Pop',
        audioFile: 'sample-track-2.mp3',
        featuredArtists: ['Artist C'],
        isNFT: true,
        price: 0.99,
        albumId: albumId,
        createdAt: now,
        updatedAt: now
      },
      // Add more sample tracks as needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tracks', null, {});
  }
};
