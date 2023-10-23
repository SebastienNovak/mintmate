const badgeResolver = {
    Query: {
        badge: async (_, { id }, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_BADGE')) {
                throw new Error('Unauthorized');
            }
            
            // Input Validation
            if (!id) {
                throw new Error('ID is required to retrieve a Badge');
            }
            
            try {
                // Retrieve a specific Badge by ID
                return await context.dataSources.badgeAPI.getBadgeById(id);
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching Badge');
            }
        },
        badges: async (_, __, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_BADGES')) {
                throw new Error('Unauthorized');
            }
            
            try {
                // Retrieve all Badges
                return await context.dataSources.badgeAPI.getAllBadges();
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching Badges');
            }
        },
    },
    Badge: {
        user: async (badge, _, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_USER')) {
                throw new Error('Unauthorized');
            }
            
            try {
                // Resolve the user (User) associated with the Badge
                return await context.dataSources.userAPI.getUserById(badge.userId);
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching associated User');
            }
        },
    },
};

module.exports = badgeResolver;
