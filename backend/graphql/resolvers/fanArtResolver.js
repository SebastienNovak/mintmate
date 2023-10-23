const fanArtResolver = {
    Query: {
      fanArt: async (_, { id }, context) => {
        // Authentication
        if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
        try {
          // Retrieve a specific FanArt by ID
          const fanArt = await context.dataSources.fanArtAPI.getFanArtById(id);
  
          // Validation
          if (!fanArt) throw new Error('Not Found: FanArt does not exist');
  
          // Authorization: Only the artist or the fan who created the FanArt or an admin can view the fanArt details
          const isAuthorized = [fanArt.artistId, fanArt.fanId].includes(context.user.id) || context.user.isAdmin;
          if (!isAuthorized) throw new Error('Forbidden: You do not have access to this FanArt');
  
          return fanArt;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching FanArt');
        }
      },
      fanArts: async (_, __, context) => {
        // Authentication
        if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
        try {
          // Authorization: Potentially limit access to certain FanArts based on user role or other criteria
          return await context.dataSources.fanArtAPI.getAllFanArts();
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching all FanArts');
        }
      },
    },
  };
  
  module.exports = fanArtResolver;
  