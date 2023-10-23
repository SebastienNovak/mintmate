const walletBasicInfoResolver = {
    Query: {
      walletBasicInfo: async (_, { id }, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
          
          // Validation: Ensure ID is provided.
          if (!id) throw new Error('Bad Request: ID must be provided');
          
          // Replace with your actual logic to retrieve the WalletBasicInfo by id.
          const walletBasicInfo = await context.dataSources.walletAPI.getWalletBasicInfoById(id);
          
          // Validation: Ensure WalletBasicInfo exists.
          if (!walletBasicInfo) throw new Error('Not Found: WalletBasicInfo does not exist');
          
          return walletBasicInfo;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching WalletBasicInfo');
        }
      },
      walletBasicInfos: async (_, __, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
          
          // Replace with your actual logic to retrieve all WalletBasicInfos.
          const walletBasicInfos = await context.dataSources.walletAPI.getAllWalletBasicInfos();
          
          // Validation: Ensure WalletBasicInfos exist.
          if (!walletBasicInfos || walletBasicInfos.length === 0) throw new Error('Not Found: No WalletBasicInfos available');
          
          return walletBasicInfos;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching WalletBasicInfos');
        }
      },
    },
    Mutation: {
      createWalletBasicInfo: async (_, { input }, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
          
          // Authorization: Optionally, ensure the logged-in user has permission to create WalletBasicInfo.
          // if (!context.user.canCreateWalletBasicInfo) throw new Error('Forbidden: You do not have permission');
          
          // Validation: Optionally, validate the input before saving it to the database.
          
          // Replace with your actual logic to create a new WalletBasicInfo.
          return await context.dataSources.walletAPI.createWalletBasicInfo(input);
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while creating WalletBasicInfo');
        }
      },
    },
  };
  
  module.exports = walletBasicInfoResolver;
  