'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    // Fetch Artist IDs from the Users table or your ArtistProfiles table if you have a separate one.
    const artists = await queryInterface.sequelize.query(
      `SELECT id FROM "Users" LIMIT 3`, 
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (artists.length < 3) {
      console.log("Not enough artist profiles found. Cannot seed FanClubs without the required artist profiles.");
      return;
    }

    return queryInterface.bulkInsert('FanClubs', [
      {
        name: 'Mystic Melodies Club',
        description: 'An exclusive fan club for the most dedicated fans of Artist A. Get access to behind-the-scenes content, early releases, and more!',
        exclusiveContentUrl: 'http://example.com/exclusiveA',
        artistId: artists[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Rockstar Realm',
        description: 'Welcome to the ultimate fan club of Artist B. Dive deep into the world of rock and discover hidden gems!',
        exclusiveContentUrl: 'http://example.com/exclusiveB',
        artistId: artists[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Euphonic Universe',
        description: 'The one-stop destination for all loyal followers of Artist C. Get a sneak peek into their music journey!',
        exclusiveContentUrl: 'http://example.com/exclusiveC',
        artistId: artists[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ... add more fan clubs as desired
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('FanClubs', null, {});
  }
};
