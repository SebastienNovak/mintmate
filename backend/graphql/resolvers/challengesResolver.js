const challengeResolver = {
    Query: {
        challenge: async (_, { id }, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_CHALLENGE')) {
                throw new Error('Unauthorized');
            }
            
            // Input Validation
            if (!id) {
                throw new Error('ID is required to retrieve a Challenge');
            }
            
            try {
                // Retrieve a specific Challenge by ID
                return await context.dataSources.challengeAPI.getChallengeById(id);
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching Challenge');
            }
        },
        allChallenges: async (_, __, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_ALL_CHALLENGES')) {
                throw new Error('Unauthorized');
            }
            
            try {
                // Retrieve all Challenges
                return await context.dataSources.challengeAPI.getAllChallenges();
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching all Challenges');
            }
        },
    },
};

module.exports = challengeResolver;
