const bidResolver = {
    Query: {
        bid: async (_, { id }, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_BID')) {
                throw new Error('Unauthorized');
            }
            
            // Input Validation
            if (!id) {
                throw new Error('ID is required to retrieve a Bid');
            }
            
            try {
                // Retrieve a specific Bid by ID
                return await context.dataSources.bidAPI.getBidById(id);
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching Bid');
            }
        },
        bids: async (_, __, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_BIDS')) {
                throw new Error('Unauthorized');
            }
            
            try {
                // Retrieve all Bids
                return await context.dataSources.bidAPI.getAllBids();
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching Bids');
            }
        },
    },
    Bid: {
        user: async (bid, _, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_USER')) {
                throw new Error('Unauthorized');
            }
            
            try {
                // Resolve the user associated with the Bid
                return await context.dataSources.userAPI.getUserById(bid.userId);
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching associated User');
            }
        },
        nft: async (bid, _, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_NFT')) {
                throw new Error('Unauthorized');
            }
            
            try {
                // Resolve the NFT associated with the Bid
                return await context.dataSources.nftAPI.getNFTById(bid.nftId);
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching associated NFT');
            }
        },
    },
};

module.exports = bidResolver;
