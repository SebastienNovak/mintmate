const leaderboardResolver = {
    ArtistProfile: {
      leaderboard: async (parent, _, context) => {
        try {
          // Authentication: Ensure the user is logged in if required
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          // The parent parameter represents the current ArtistProfile object.
          const artistId = parent.id;
  
          // Validation: Optionally validate if the ArtistProfile exists in your data source if needed.
          const artistProfile = await context.dataSources.artistProfileAPI.getArtistProfileById(artistId);
          if (!artistProfile) throw new Error('Not Found: ArtistProfile does not exist');
  
          // Replace with your actual logic to retrieve the leaderboard associated with an ArtistProfile.
          return context.dataSources.leaderboardAPI.getLeaderboardByUserId(artistId);
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Leaderboard for this ArtistProfile');
        }
      },
    },
    Query: {
      leaderboard: async (_, { userId }, context) => {
        // Authentication & Authorization: Ensure the user is logged in and has permissions to view leaderboards
        if (!context.user) throw new Error('Unauthorized: Must be logged in');
        
        // Validation & Error Handling: Ensure the leaderboard exists
        const leaderboard = await context.dataSources.leaderboardAPI.getLeaderboardByUserId(userId);
        if (!leaderboard) throw new Error('Not Found: Leaderboard does not exist');
  
        return leaderboard;
      },
      leaderboards: async (_, __, context) => {
        // Authentication & Authorization: Ensure the user is logged in and has permissions to view leaderboards
        if (!context.user) throw new Error('Unauthorized: Must be logged in');
        
        return context.dataSources.leaderboardAPI.getAllLeaderboards();
      },
    },
  };
  
  module.exports = leaderboardResolver;
  