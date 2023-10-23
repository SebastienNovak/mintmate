const disputeResolver = {
    Query: {
      dispute: async (_, { id }, context) => {
        // Authentication
        if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
        try {
          // Retrieve a specific Dispute by ID
          const dispute = await context.dataSources.disputeAPI.getDisputeById(id);
  
          // Validation
          if (!dispute) throw new Error('Not Found: Dispute does not exist');
  
          // Authorization: Only the users involved in the transaction or an admin can view the dispute
          const isAuthorized = [dispute.buyerId, dispute.sellerId].includes(context.user.id) || context.user.isAdmin;
          if (!isAuthorized) throw new Error('Forbidden: You do not have access to this dispute');
  
          return dispute;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching dispute');
        }
      },
      allDisputes: async (_, __, context) => {
        // Authentication and Authorization: Only admins can access all disputes
        if (!context.user || !context.user.isAdmin) throw new Error('Unauthorized: Must be an admin to access all disputes');
  
        try {
          return await context.dataSources.disputeAPI.getAllDisputes();
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching all disputes');
        }
      },
    },
    Dispute: {
      transaction: async (parent, _, context) => {
        try {
          return await context.dataSources.transactionAPI.getTransactionById(parent.transactionId);
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching the transaction of the dispute');
        }
      },
    },
  };
  
  module.exports = disputeResolver;
  