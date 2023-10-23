const fanClubResolver = {
    Query: {
      fanClub: async (_, { id }, context) => {
        // Authentication
        if (!context.user) throw new Error('Unauthorized: Must be logged in');

        try {
          // Retrieve a specific FanClub by ID
          const fanClub = await context.dataSources.fanClubAPI.getFanClubById(id);

          // Validation
          if (!fanClub) throw new Error('Not Found: FanClub does not exist');

          // Authorization: Allow access if user is a member of the fan club or an admin
          const isMember = fanClub.members.includes(context.user.id);
          if (!isMember && !context.user.isAdmin) throw new Error('Forbidden: You do not have access to this FanClub');

          return fanClub;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching FanClub');
        }
      },
      fanClubs: async (_, __, context) => {
        // Authentication
        if (!context.user) throw new Error('Unauthorized: Must be logged in');

        try {
          // Retrieve all FanClubs. Additional authorization can be implemented as per the requirements.
          return await context.dataSources.fanClubAPI.getAllFanClubs();
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching all FanClubs');
        }
      },
    },
    Mutation: {
      createFanClub: async (_, { input }, context) => {
        // Authentication
        if (!context.user) throw new Error('Unauthorized: Must be logged in');

        try {
          // Authorization: Potentially only allow certain user roles to create a FanClub.
          if (!context.user.canCreateFanClub) throw new Error('Forbidden: You do not have permission to create a FanClub');

          // Replace with your actual logic to create a FanClub in your data source.
          return await context.dataSources.fanClubAPI.createFanClub(input);
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while creating FanClub');
        }
      },
      updateFanClub: async (_, { id, input }, context) => {
        // Authentication
        if (!context.user) throw new Error('Unauthorized: Must be logged in');

        try {
          // Retrieve the existing FanClub
          const existingFanClub = await context.dataSources.fanClubAPI.getFanClubById(id);

          // Validation: Check if FanClub exists
          if (!existingFanClub) throw new Error('Not Found: FanClub does not exist');

          // Authorization: Only allow the owner of the FanClub or an admin to update the FanClub
          if (existingFanClub.ownerId !== context.user.id && !context.user.isAdmin)
            throw new Error('Forbidden: You do not have permission to update this FanClub');

          // Replace with your actual logic to update a FanClub in your data source.
          return await context.dataSources.fanClubAPI.updateFanClub(id, input);
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while updating FanClub');
        }
      },
    },
  };
  
  module.exports = fanClubResolver;
