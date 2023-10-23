const mentorshipResolver = {
    User: {
      mentorshipsAsArtist: async (parent, _, context) => {
        try {
          // Authentication: Ensure the user is logged in if required
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          // The parent parameter represents the current User object.
          const userId = parent.id;
  
          // Validation: Optionally validate if the User exists in your data source if needed.
          const user = await context.dataSources.userAPI.getUserById(userId);
          if (!user) throw new Error('Not Found: User does not exist');
  
          // Replace with your actual logic to retrieve the mentorships where the user is the artist.
          return context.dataSources.mentorshipAPI.getMentorshipsByArtistId(userId);
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Mentorships for this Artist');
        }
      },
      mentorshipsAsMentee: async (parent, _, context) => {
        try {
          // Authentication: Ensure the user is logged in if required
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          const userId = parent.id;
  
          // Validation: Optionally validate if the User exists in your data source if needed.
          const user = await context.dataSources.userAPI.getUserById(userId);
          if (!user) throw new Error('Not Found: User does not exist');
  
          // Replace with your actual logic to retrieve the mentorships where the user is the mentee.
          return context.dataSources.mentorshipAPI.getMentorshipsByMenteeId(userId);
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Mentorships for this Mentee');
        }
      },
    },
    Query: {
      mentorship: async (_, { id }, context) => {
        // Authentication & Authorization: Ensure the user is logged in and has permissions to view mentorships
        if (!context.user) throw new Error('Unauthorized: Must be logged in');
        
        // Validation & Error Handling: Ensure the mentorship exists
        const mentorship = await context.dataSources.mentorshipAPI.getMentorshipById(id);
        if (!mentorship) throw new Error('Not Found: Mentorship does not exist');
  
        return mentorship;
      },
      mentorships: async (_, __, context) => {
        // Authentication & Authorization: Ensure the user is logged in and has permissions to view all mentorships
        if (!context.user) throw new Error('Unauthorized: Must be logged in');
        
        return context.dataSources.mentorshipAPI.getAllMentorships();
      },
    },
  };
  
  module.exports = mentorshipResolver;
  