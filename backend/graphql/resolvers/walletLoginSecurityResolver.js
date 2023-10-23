const walletLoginSecurityResolver = {
    Query: {
        walletLoginSecurity: async (_, { id }, context) => {
            try {
                if (!id) throw new Error('Bad Request: ID must be provided');

                // Replace with your actual logic to retrieve the WalletLoginSecurity by id.
                const walletLoginSecurity = await context.dataSources.walletAPI.getWalletLoginSecurityById(id);
                
                if (!walletLoginSecurity) throw new Error('Not Found: WalletLoginSecurity does not exist');
                
                return walletLoginSecurity;
            } catch (error) {
                console.error(error);
                throw new Error('Error occurred while fetching WalletLoginSecurity');
            }
        },
        walletLoginSecurities: async (_, __, context) => {
            try {
                // Replace with your actual logic to retrieve all WalletLoginSecurities.
                const walletLoginSecurities = await context.dataSources.walletAPI.getAllWalletLoginSecurities();
                
                if (!walletLoginSecurities || walletLoginSecurities.length === 0) throw new Error('Not Found: No WalletLoginSecurities available');
                
                return walletLoginSecurities;
            } catch (error) {
                console.error(error);
                throw new Error('Error occurred while fetching WalletLoginSecurities');
            }
        },
    },
};

module.exports = walletLoginSecurityResolver;
