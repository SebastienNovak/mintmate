const virtualStudioSessionResolver = {
    Query: {
      virtualStudioSession: async (_, { id }, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          // Validation: Ensure ID is provided.
          if (!id) throw new Error('Bad Request: ID must be provided');
  
          // Replace with your actual logic to retrieve the VirtualStudioSession by id.
          const virtualStudioSession = await context.dataSources.virtualStudioSessionAPI.getVirtualStudioSessionById(id);
  
          // Validation: Ensure VirtualStudioSession exists.
          if (!virtualStudioSession) throw new Error('Not Found: VirtualStudioSession does not exist');
  
          return virtualStudioSession;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching VirtualStudioSession');
        }
      },
      virtualStudioSessions: async (_, __, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          // Replace with your actual logic to retrieve all VirtualStudioSessions.
          const virtualStudioSessions = await context.dataSources.virtualStudioSessionAPI.getAllVirtualStudioSessions();
  
          // Validation: Ensure VirtualStudioSessions exist.
          if (!virtualStudioSessions || virtualStudioSessions.length === 0) throw new Error('Not Found: No VirtualStudioSessions available');
  
          return virtualStudioSessions;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching VirtualStudioSessions');
        }
      },
    },
    Mutation: {
      createVirtualStudioSession: async (_, { input }, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          // Authorization: Optionally, ensure the logged-in user has permission to create VirtualStudioSessions.
          // if (!context.user.canCreateVirtualStudioSession) throw new Error('Forbidden: You do not have permission');
  
          // Validation: Optionally, validate the input before saving it to the database.
  
          // Replace with your actual logic to create a new VirtualStudioSession.
          return await context.dataSources.virtualStudioSessionAPI.createVirtualStudioSession(input);
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while creating VirtualStudioSession');
        }
      },
    },
  };
  
  module.exports = virtualStudioSessionResolver;
  