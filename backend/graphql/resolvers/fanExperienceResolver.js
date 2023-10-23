const fanExperienceResolver = {
    Query: {
      fanExperience: async (_, { id }, context) => {
        // Authentication
        if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
        try {
          // Retrieve a specific FanExperience by ID
          const fanExperience = await context.dataSources.fanExperienceAPI.getFanExperienceById(id);
  
          // Validation
          if (!fanExperience) throw new Error('Not Found: FanExperience does not exist');
  
          // Authorization: Potentially check if user has access to this specific FanExperience.
          // This would be highly dependant on your business logic.
          if (fanExperience.userId !== context.user.id && !context.user.isAdmin)
            throw new Error('Forbidden: You do not have access to this FanExperience');
  
          return fanExperience;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching FanExperience');
        }
      },
      fanExperiences: async (_, __, context) => {
        // Authentication
        if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
        try {
          // Retrieve all FanExperiences. Additional authorization checks can be implemented as per the requirements.
          return await context.dataSources.fanExperienceAPI.getAllFanExperiences();
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching all FanExperiences');
        }
      },
    },
    Mutation: {
      createFanExperience: async (_, { input }, context) => {
        // Authentication
        if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
        try {
          // Authorization: Potentially only allow certain user roles to create a FanExperience.
          // This would be highly dependant on your business logic.
  
          // Replace with your actual logic to create a FanExperience in your data source.
          return await context.dataSources.fanExperienceAPI.createFanExperience(input);
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while creating FanExperience');
        }
      },
      updateFanExperience: async (_, { id, input }, context) => {
        // Authentication
        if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
        try {
          // Retrieve the existing FanExperience
          const existingFanExperience = await context.dataSources.fanExperienceAPI.getFanExperienceById(id);
  
          // Validation: Check if FanExperience exists
          if (!existingFanExperience) throw new Error('Not Found: FanExperience does not exist');
  
          // Authorization: Only allow the owner of the FanExperience or an admin to update the FanExperience
          if (existingFanExperience.userId !== context.user.id && !context.user.isAdmin)
            throw new Error('Forbidden: You do not have permission to update this FanExperience');
  
          // Replace with your actual logic to update a FanExperience in your data source.
          return await context.dataSources.fanExperienceAPI.updateFanExperience(id, input);
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while updating FanExperience');
        }
      },
      deleteFanExperience: async (_, { id }, context) => {
        // Authentication
        if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
        try {
          // Retrieve the existing FanExperience
          const existingFanExperience = await context.dataSources.fanExperienceAPI.getFanExperienceById(id);
  
          // Validation: Check if FanExperience exists
          if (!existingFanExperience) throw new Error('Not Found: FanExperience does not exist');
  
          // Authorization: Only allow the owner of the FanExperience or an admin to delete the FanExperience
          if (existingFanExperience.userId !== context.user.id && !context.user.isAdmin)
            throw new Error('Forbidden: You do not have permission to delete this FanExperience');
  
          // Replace with your actual logic to delete a FanExperience in your data source.
          return await context.dataSources.fanExperienceAPI.deleteFanExperience(id);
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while deleting FanExperience');
        }
      },
    },
  };
  
  module.exports = fanExperienceResolver;
  