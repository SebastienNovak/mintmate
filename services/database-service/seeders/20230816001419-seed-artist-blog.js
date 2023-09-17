'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    // Fetching artist user IDs based on their names
    const artists = await queryInterface.sequelize.query(
      `SELECT id, name FROM "Users" WHERE name IN ('John Doe', 'Jane Smith', 'Alex Morgan')`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const johnDoeId = artists.find(artist => artist.name === 'John Doe').id;
    const janeSmithId = artists.find(artist => artist.name === 'Jane Smith').id;
    const alexMorganId = artists.find(artist => artist.name === 'Alex Morgan').id;

    await queryInterface.bulkInsert('ArtistBlogs', [
      {
        userId: johnDoeId,
        title: 'My Musical Journey',
        content: 'It all started when I was a kid and...',
        imageUrl: 'path/to/blogImage1.jpg',
        publishedAt: new Date('2022-01-10'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: janeSmithId,
        title: 'Inspiration Behind My Latest Album',
        content: 'When I started writing the songs for my latest album...',
        imageUrl: 'path/to/blogImage2.jpg',
        publishedAt: new Date('2021-12-05'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: alexMorganId,
        title: 'The Role of Nature in My Songs',
        content: 'Nature has always played a significant role in my creative process...',
        imageUrl: 'path/to/blogImage3.jpg',
        publishedAt: null, // this one is not published yet
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // ... you can add more blog entries here
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ArtistBlogs', null, {});
  }
};
