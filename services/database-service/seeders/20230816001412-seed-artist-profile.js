'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    // Fetch user IDs based on their emails, since emails are unique
    const users = await queryInterface.sequelize.query(
      `SELECT id, email FROM "Users" WHERE email IN ('johndoe@example.com', 'janesmith@example.com', 'alexmorgan@example.com')`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    const johnDoeId = users.find(user => user.email === 'johndoe@example.com').id;
    const janeSmithId = users.find(user => user.email === 'janesmith@example.com').id;
    const alexMorganId = users.find(user => user.email === 'alexmorgan@example.com').id;

    return queryInterface.bulkInsert('ArtistProfiles', [
      {
        userId: johnDoeId,
        biography: 'Artist A has been in the music industry for over 20 years...',
        genre: 'Rock',
        albumsReleased: 10,
        websiteUrl: 'https://www.artistA.com',
        socialMediaLinks: JSON.stringify({
          facebook: 'https://facebook.com/artistA',
          twitter: 'https://twitter.com/artistA',
          instagram: 'https://instagram.com/artistA',
        }),
        profileImage: 'path/to/profile/imageA.jpg',
        discography: 'List of albums...',
        accolades: 'Multiple awards...',
        imageUrl: 'path/to/imageA.jpg',
        bannerUrl: 'path/to/bannerA.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: janeSmithId,
        biography: 'Jane Smith, commonly known by her stage name "J-Smooth", is a Pop sensation who has been climbing the charts rapidly...',
        genre: 'Pop',
        albumsReleased: 8,
        websiteUrl: 'https://www.jsmooth.com',
        socialMediaLinks: JSON.stringify({
          facebook: 'https://facebook.com/jsmooth',
          twitter: 'https://twitter.com/jsmooth',
          instagram: 'https://instagram.com/jsmooth',
        }),
        profileImage: 'path/to/profile/imageSmith.jpg',
        discography: 'Top Hits, Summer Vibes, Dance Night...',
        accolades: 'Billboard Top 100, MTV Award...',
        imageUrl: 'path/to/imageSmith.jpg',
        bannerUrl: 'path/to/bannerSmith.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: alexMorganId,
        biography: 'Alex Morgan is an emerging artist known for blending jazz and pop...',
        genre: 'Pop Jazz',
        albumsReleased: 5,
        websiteUrl: 'https://www.alexmorganmusic.com',
        socialMediaLinks: JSON.stringify({
          facebook: 'https://facebook.com/alexmorganmusic',
          twitter: 'https://twitter.com/alexmorganmusic',
          instagram: 'https://instagram.com/alexmorganmusic',
        }),
        profileImage: 'path/to/profile/imageMorgan.jpg',
        discography: 'Rising Star, Echoes, Melodies...',
        accolades: 'Best New Artist...',
        imageUrl: 'path/to/imageMorgan.jpg',
        bannerUrl: 'path/to/bannerMorgan.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }      
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ArtistProfiles', null, {});
  }
};
