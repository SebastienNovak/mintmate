const playlistResolver = {
    Query: {
      playlist: async (_, { id }, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          // Validation: Ensure ID is provided.
          if (!id) throw new Error('Bad Request: ID must be provided');
  
          // Replace with your actual logic to retrieve the Playlist by id.
          const playlist = await context.dataSources.playlistAPI.getPlaylistById(id);
  
          // Authorization: Ensure the logged-in user has access to the Playlist.
          if (playlist.userId !== context.user.id) throw new Error('Forbidden: Access is denied');
  
          // Validation: Ensure Playlist exists.
          if (!playlist) throw new Error('Not Found: Playlist does not exist');
  
          return playlist;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Playlist');
        }
      },
      playlists: async (_, { userId }, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          // Authorization: Ensure the logged-in user is requesting their own playlists.
          if (userId !== context.user.id) throw new Error('Forbidden: Access is denied');
  
          // Validation: Ensure userId is provided.
          if (!userId) throw new Error('Bad Request: userId must be provided');
  
          // Replace with your actual logic to retrieve all Playlists for a user.
          const playlists = await context.dataSources.playlistAPI.getPlaylistsByUserId(userId);
  
          // Validation: Ensure Playlists exist.
          if (!playlists || playlists.length === 0) throw new Error('Not Found: No Playlists available');
  
          return playlists;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Playlists');
        }
      },
    },
  };
  
  module.exports = playlistResolver;
  