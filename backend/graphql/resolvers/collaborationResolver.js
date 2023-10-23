const collaborationResolver = {
  Query: {
    collaboration: async (_, { id }, context) => {
      // Authentication
      if (!context.user) throw new Error('Unauthorized: Must be logged in');

      try {
        // Retrieve a specific collaboration by ID
        const collaboration = await context.dataSources.collaborationAPI.getCollaborationById(id);
        
        // Validation
        if (!collaboration) throw new Error('Not Found: Collaboration does not exist');

        // Authorization: The user should be part of the collaboration or an admin
        const isAuthorized = context.user.id === collaboration.artistId || context.user.isAdmin;
        if (!isAuthorized) throw new Error('Forbidden: You do not have access to this collaboration');

        return collaboration;
      } catch (error) {
        console.error(error);
        throw new Error('Error occurred while fetching collaboration');
      }
    },
    allCollaborations: async (_, __, context) => {
      // Authentication and Authorization: Only admins can access all collaborations
      if (!context.user || !context.user.isAdmin) throw new Error('Unauthorized: Must be an admin to access all collaborations');
      
      try {
        return await context.dataSources.collaborationAPI.getAllCollaborations();
      } catch (error) {
        console.error(error);
        throw new Error('Error occurred while fetching all collaborations');
      }
    },
  },
  Collaboration: {
    artist: async (parent, _, context) => {
      try {
        return await context.dataSources.userAPI.getUserById(parent.artistId);
      } catch (error) {
        console.error(error);
        throw new Error('Error occurred while fetching the artist of the collaboration');
      }
    },
    track: async (parent, _, context) => {
      try {
        return parent.trackId ? await context.dataSources.trackAPI.getTrackById(parent.trackId) : null;
      } catch (error) {
        console.error(error);
        throw new Error('Error occurred while fetching the track of the collaboration');
      }
    },
    album: async (parent, _, context) => {
      try {
        return parent.albumId ? await context.dataSources.albumAPI.getAlbumById(parent.albumId) : null;
      } catch (error) {
        console.error(error);
        throw new Error('Error occurred while fetching the album of the collaboration');
      }
    },
  },
};

module.exports = collaborationResolver;
