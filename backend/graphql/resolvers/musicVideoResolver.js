const musicVideoResolver = {
    Query: {
      musicVideo: async (_, { id }, context) => {
        try {
          // Authentication: Ensure the user is logged in if required.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          // Validation: Ensure ID is provided.
          if (!id) throw new Error('Bad Request: ID must be provided');
  
          // Replace with your actual logic to retrieve the MusicVideo by id.
          const musicVideo = await context.dataSources.musicVideoAPI.getMusicVideoById(id);
  
          // Validation: Ensure MusicVideo exists.
          if (!musicVideo) throw new Error('Not Found: MusicVideo does not exist');
  
          return musicVideo;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching MusicVideo');
        }
      },
      musicVideos: async (_, __, context) => {
        try {
          // Authentication: Ensure the user is logged in if required.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          // Replace with your actual logic to retrieve all MusicVideos.
          const musicVideos = await context.dataSources.musicVideoAPI.getAllMusicVideos();
  
          // Validation: Ensure MusicVideos exist.
          if (!musicVideos || musicVideos.length === 0) throw new Error('Not Found: No MusicVideos available');
  
          return musicVideos;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching MusicVideos');
        }
      },
    },
  };
  
  module.exports = musicVideoResolver;
  