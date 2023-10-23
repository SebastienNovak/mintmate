const refundResolver = {
    Query: {
      refund: async (_, { id }, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          // Validation: Ensure ID is provided.
          if (!id) throw new Error('Bad Request: ID must be provided');
  
          // Replace with your actual logic to retrieve the Refund by id.
          const refund = await context.dataSources.refundAPI.getRefundById(id);
  
          // Authorization: Ensure the logged-in user has access to the Refund.
          // This should be modified according to your actual logic for access control.
          // For example, check whether the refund belongs to a transaction of the logged-in user.
          // if (refund.transactionUserId !== context.user.id) throw new Error('Forbidden: Access is denied');
  
          // Validation: Ensure Refund exists.
          if (!refund) throw new Error('Not Found: Refund does not exist');
  
          return refund;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Refund');
        }
      },
      refunds: async (_, { transactionId }, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          // Validation: Ensure transactionId is provided.
          if (!transactionId) throw new Error('Bad Request: transactionId must be provided');
  
          // Replace with your actual logic to retrieve all Refunds for a transaction.
          const refunds = await context.dataSources.refundAPI.getRefundsByTransactionId(transactionId);
  
          // Authorization: Ensure the logged-in user has access to the Refunds.
          // This should be modified according to your actual logic for access control.
          // For example, check whether the refunds belong to transactions of the logged-in user.
          // if (!refunds.every(refund => refund.transactionUserId === context.user.id)) throw new Error('Forbidden: Access is denied');
  
          // Validation: Ensure Refunds exist.
          if (!refunds || refunds.length === 0) throw new Error('Not Found: No Refunds available');
  
          return refunds;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Refunds');
        }
      },
    },
  };
  
  module.exports = refundResolver;
  