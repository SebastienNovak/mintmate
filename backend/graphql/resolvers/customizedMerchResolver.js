const customizedMerchResolver = {
    Query: {
      customizedMerch: async (_, { id }, context) => {
        // Authentication
        if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
        try {
          // Retrieve a specific CustomizedMerch by ID
          const customizedMerch = await context.dataSources.customizedMerchAPI.getCustomizedMerchById(id);
  
          // Validation
          if (!customizedMerch) throw new Error('Not Found: Customized Merchandise does not exist');
  
          // Authorization: User should be the creator of the CustomizedMerch or an admin
          const isAuthorized = context.user.id === customizedMerch.userId || context.user.isAdmin;
          if (!isAuthorized) throw new Error('Forbidden: You do not have access to this customized merchandise');
  
          return customizedMerch;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching customized merchandise');
        }
      },
      allCustomizedMerches: async (_, __, context) => {
        // Authentication and Authorization: Only admins can access all customized merchandise
        if (!context.user || !context.user.isAdmin) throw new Error('Unauthorized: Must be an admin to access all customized merchandise');
  
        try {
          return await context.dataSources.customizedMerchAPI.getAllCustomizedMerches();
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching all customized merchandise');
        }
      },
    },
    CustomizedMerch: {
      user: async (parent, _, context) => {
        try {
          return await context.dataSources.userAPI.getUserById(parent.userId);
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching the user of the customized merchandise');
        }
      },
      merchandise: async (parent, _, context) => {
        try {
          return await context.dataSources.merchandiseAPI.getMerchandiseById(parent.merchId);
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching the merchandise of the customized merchandise');
        }
      },
    },
  };
  
  module.exports = customizedMerchResolver;
  