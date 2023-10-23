const genreResolver = {
    Genre: {
      albums: async (parent, _, context) => {
        // Authentication: Depending on your use case, you might want to make sure the user is logged in.
        if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
        try {
          // The parent parameter represents the current Genre object.
          const genreId = parent.id;
  
          // Validation: Potentially validate if the genre exists in your data source if needed.
          const genre = await context.dataSources.genreAPI.getGenreById(genreId);
          if (!genre) throw new Error('Not Found: Genre does not exist');
  
          // Replace with your actual logic to retrieve albums associated with a Genre.
          return await context.dataSources.albumAPI.getAlbumsByGenreId(genreId);
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching albums for this Genre');
        }
      },
    },
  };
  
  module.exports = genreResolver;
  