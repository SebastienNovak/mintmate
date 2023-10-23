const transactionMetaResolver = {
    Query: {
      transactionMeta: async (_, { id }, context) => {
        try {
          // Authentication: Optionally, ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          // Validation: Ensure ID is provided.
          if (!id) throw new Error('Bad Request: ID must be provided');
  
          // Replace with your actual logic to retrieve the TransactionMeta by id.
          const transactionMeta = await context.dataSources.transactionMetaAPI.getTransactionMetaById(id);
  
          // Validation: Ensure TransactionMeta exists.
          if (!transactionMeta) throw new Error('Not Found: TransactionMeta does not exist');
  
          // Authorization: Optionally, ensure the logged-in user has permission to view the TransactionMeta.
          // if (context.user.id !== transactionMeta.userId) throw new Error('Forbidden: You do not have permission');
  
          return transactionMeta;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching TransactionMeta');
        }
      },
      transactionMetas: async (_, __, context) => {
        try {
          // Authentication: Optionally, ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          // Replace with your actual logic to retrieve all TransactionMetas.
          const transactionMetas = await context.dataSources.transactionMetaAPI.getAllTransactionMetas();
  
          // Validation: Ensure TransactionMetas exist.
          if (!transactionMetas || transactionMetas.length === 0) throw new Error('Not Found: No TransactionMetas available');
  
          return transactionMetas;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching TransactionMetas');
        }
      },
    },
    TransactionMeta: {
      transaction: async (parent, _, context) => {
        try {
          // Authentication: Optionally, ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          // Validation: Ensure parent.transactionId is provided and valid.
          if (!parent.transactionId) throw new Error('Bad Request: Invalid Transaction ID');
  
          // Replace with your actual logic to retrieve the associated Transaction.
          const transaction = await context.dataSources.transactionAPI.getTransactionById(parent.transactionId);
  
          // Validation: Ensure Transaction exists.
          if (!transaction) throw new Error('Not Found: Transaction does not exist');
  
          return transaction;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching associated Transaction');
        }
      },
    },
  };
  
  module.exports = transactionMetaResolver;
  