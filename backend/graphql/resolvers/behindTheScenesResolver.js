const behindTheSceneResolver = {
    Query: {
        behindTheScene: async (_, { id }, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_BEHIND_THE_SCENE')) {
                throw new Error('Unauthorized');
            }
            
            // Input Validation
            if (!id) {
                throw new Error('ID is required to retrieve a BehindTheScene');
            }
            
            try {
                // Retrieve a specific BehindTheScene by ID
                return await context.dataSources.behindTheSceneAPI.getBehindTheSceneById(id);
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching BehindTheScene');
            }
        },
        behindTheScenes: async (_, __, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_BEHIND_THE_SCENES')) {
                throw new Error('Unauthorized');
            }
            
            try {
                // Retrieve all BehindTheScenes
                return await context.dataSources.behindTheSceneAPI.getAllBehindTheScenes();
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching BehindTheScenes');
            }
        },
    },
    BehindTheScene: {
        artist: async (behindTheScene, _, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_ARTIST')) {
                throw new Error('Unauthorized');
            }
            
            try {
                // Resolve the artist (User) associated with the BehindTheScene
                return await context.dataSources.userAPI.getUserById(behindTheScene.artistId);
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching associated Artist');
            }
        },
    },
};

module.exports = behindTheSceneResolver;
