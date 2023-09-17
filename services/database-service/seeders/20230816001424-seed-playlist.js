'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch user IDs dynamically to ensure they exist
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" LIMIT 2`, // Fetch the first two users as an example
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Check if there are enough users
    if (users.length < 2) {
      throw new Error('Failed to retrieve enough users for seeding.');
    }

    // Insert sample data into the Playlists table using the dynamically retrieved user IDs
    const playlists = await queryInterface.bulkInsert('Playlists', [
      {
        name: 'Chill Vibes',
        description: 'A collection of chill tracks to relax your mind.',
        userId: users[0].id, // Use the ID of the first user
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Workout Tunes',
        description: 'Energizing tracks to boost your workout session.',
        userId: users[1].id, // Use the ID of the second user
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true }); 

    const chillVibesId = playlists.find(playlist => playlist.name === 'Chill Vibes').id;
    const workoutTunesId = playlists.find(playlist => playlist.name === 'Workout Tunes').id;

    // Fetch track IDs from the Tracks table
    const tracks = await queryInterface.sequelize.query(
      `SELECT id FROM "Tracks" LIMIT 3`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const trackIds = tracks.map(track => track.id);

    // Insert data into PlaylistTracks using the fetched playlist and track IDs
    await queryInterface.bulkInsert('PlaylistTracks', [
      {
        playlistId: chillVibesId,
        trackId: trackIds[0],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: chillVibesId,
        trackId: trackIds[1],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        playlistId: workoutTunesId,
        trackId: trackIds[2],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PlaylistTracks', null, {});
    await queryInterface.bulkDelete('Playlists', null, {});
  }
};
