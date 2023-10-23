const labelResolver = {
    Label: {
      users: async (parent, _, context) => {
        try {
          // Authentication: Ensure the user is logged in if required
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          const labelId = parent.id;
          
          // Validation: Optionally validate if the label exists in your data source if needed.
          const label = await context.dataSources.labelAPI.getLabelById(labelId);
          if (!label) throw new Error('Not Found: Label does not exist');
  
          // Replace with your actual logic to retrieve users associated with a Label.
          return await context.dataSources.userAPI.getUsersByLabelId(labelId);
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching users for this Label');
        }
      },
    },
    Query: {
      label: async (_, { id }, context) => {
        // Authentication & Authorization: Ensure the user is logged in and has permissions to view labels
        if (!context.user) throw new Error('Unauthorized: Must be logged in');
        
        // Validation & Error Handling: Ensure the label exists
        const label = await context.dataSources.labelAPI.getLabelById(id);
        if (!label) throw new Error('Not Found: Label does not exist');
        
        return label;
      },
      labels: async (_, __, context) => {
        // Authentication & Authorization: Ensure the user is logged in and has permissions to view labels
        if (!context.user) throw new Error('Unauthorized: Must be logged in');
        
        return context.dataSources.labelAPI.getAllLabels();
      },
    },
    Mutation: {
      createLabel: async (_, { input }, context) => {
        // Authentication & Authorization: Ensure the user is logged in and has permissions to create labels
        if (!context.user) throw new Error('Unauthorized: Must be logged in');
        
        // Additional logic to validate input, etc.
        return context.dataSources.labelAPI.createLabel(input);
      },
      updateLabel: async (_, { id, input }, context) => {
        // Authentication & Authorization: Ensure the user is logged in and has permissions to update labels
        if (!context.user) throw new Error('Unauthorized: Must be logged in');
        
        // Validation & Error Handling: Ensure the label exists
        const label = await context.dataSources.labelAPI.getLabelById(id);
        if (!label) throw new Error('Not Found: Label does not exist');
        
        // Additional logic to validate input, etc.
        return context.dataSources.labelAPI.updateLabel(id, input);
      },
      deleteLabel: async (_, { id }, context) => {
        // Authentication & Authorization: Ensure the user is logged in and has permissions to delete labels
        if (!context.user) throw new Error('Unauthorized: Must be logged in');
        
        // Validation & Error Handling: Ensure the label exists
        const label = await context.dataSources.labelAPI.getLabelById(id);
        if (!label) throw new Error('Not Found: Label does not exist');
        
        return context.dataSources.labelAPI.deleteLabel(id);
      },
    },
  };
  
  module.exports = labelResolver;
  