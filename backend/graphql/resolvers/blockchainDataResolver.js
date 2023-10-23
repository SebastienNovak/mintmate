const blockchainDataResolver = {
    Query: {
        blockchainData: async (_, { id }, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_BLOCKCHAIN_DATA')) {
                throw new Error('Unauthorized');
            }
            
            // Input Validation
            if (!id) {
                throw new Error('ID is required to retrieve a BlockchainData');
            }
            
            try {
                // Retrieve a specific BlockchainData by ID
                return await context.dataSources.blockchainDataAPI.getBlockchainDataById(id);
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching BlockchainData');
            }
        },
        allBlockchainData: async (_, __, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_ALL_BLOCKCHAIN_DATA')) {
                throw new Error('Unauthorized');
            }
            
            try {
                // Retrieve all BlockchainData
                return await context.dataSources.blockchainDataAPI.getAllBlockchainData();
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching all BlockchainData');
            }
        },
    },
    BlockchainData: {
        transaction: async (blockchainData, _, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_TRANSACTION')) {
                throw new Error('Unauthorized');
            }
            
            try {
                // Resolve the transaction associated with the BlockchainData
                return await context.dataSources.transactionAPI.getTransactionById(blockchainData.transactionId);
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching associated Transaction');
            }
        },
    },
};

module.exports = blockchainDataResolver;
