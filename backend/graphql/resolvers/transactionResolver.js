const transactionResolver = {
    Query: {
      transaction: async (_, { id }, context) => {
        try {
          // Authentication: Optionally, ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          // Validation: Ensure ID is provided.
          if (!id) throw new Error('Bad Request: ID must be provided');
  
          // Replace with your actual logic to retrieve the Transaction by id.
          const transaction = await context.dataSources.transactionAPI.getTransactionById(id);
  
          // Validation: Ensure Transaction exists.
          if (!transaction) throw new Error('Not Found: Transaction does not exist');
  
          // Authorization: Optionally, ensure the logged-in user has permission to view the Transaction.
          // if (context.user.id !== transaction.userId) throw new Error('Forbidden: You do not have permission');
  
          return transaction;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Transaction');
        }
      },
      transactions: async (_, __, context) => {
        try {
          // Authentication: Optionally, ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          // Replace with your actual logic to retrieve all Transactions.
          const transactions = await context.dataSources.transactionAPI.getAllTransactions();
  
          // Validation: Ensure Transactions exist.
          if (!transactions || transactions.length === 0) throw new Error('Not Found: No Transactions available');
  
          return transactions;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Transactions');
        }
      },
    },
    Transaction: {
      dispute: async (parent, _, context) => {
        try {
          // Authentication: Optionally, ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          // Validation: Ensure parent.id is provided and valid.
          if (!parent.id) throw new Error('Bad Request: Invalid Transaction ID');
  
          // Replace with your actual logic to retrieve the associated Dispute.
          const dispute = await context.dataSources.disputeAPI.getDisputeByTransactionId(parent.id);
  
          // Validation: Ensure Dispute exists.
          if (!dispute) throw new Error('Not Found: Dispute does not exist');
  
          return dispute;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching associated Dispute');
        }
      },
    },
  };
  
  module.exports = transactionResolver;
  