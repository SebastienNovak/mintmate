const virtualInstrumentResolver = {
    Query: {
      virtualInstrument: async (_, { id }, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          // Validation: Ensure ID is provided.
          if (!id) throw new Error('Bad Request: ID must be provided');
  
          // Replace with your actual logic to retrieve the VirtualInstrument by id.
          const virtualInstrument = await context.dataSources.virtualInstrumentAPI.getVirtualInstrumentById(id);
  
          // Validation: Ensure VirtualInstrument exists.
          if (!virtualInstrument) throw new Error('Not Found: VirtualInstrument does not exist');
  
          return virtualInstrument;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching VirtualInstrument');
        }
      },
      virtualInstruments: async (_, __, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          // Replace with your actual logic to retrieve all VirtualInstruments.
          const virtualInstruments = await context.dataSources.virtualInstrumentAPI.getAllVirtualInstruments();
  
          // Validation: Ensure VirtualInstruments exist.
          if (!virtualInstruments || virtualInstruments.length === 0) throw new Error('Not Found: No VirtualInstruments available');
  
          return virtualInstruments;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching VirtualInstruments');
        }
      },
    },
    Mutation: {
      createVirtualInstrument: async (_, { input }, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          // Authorization: Optionally, ensure the logged-in user has permission to create VirtualInstruments.
          // if (!context.user.canCreateVirtualInstrument) throw new Error('Forbidden: You do not have permission');
  
          // Validation: Optionally, validate the input before saving it to the database.
  
          // Replace with your actual logic to create a new VirtualInstrument.
          return await context.dataSources.virtualInstrumentAPI.createVirtualInstrument(input);
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while creating VirtualInstrument');
        }
      },
    },
  };
  
  module.exports = virtualInstrumentResolver;
  