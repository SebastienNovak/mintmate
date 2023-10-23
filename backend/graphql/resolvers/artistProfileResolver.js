const artistProfileResolver = {
    Query: {
        artistProfile: async (_, { id }, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_ARTIST_PROFILE')) {
                throw new Error('Unauthorized');
            }
            
            // Input Validation
            if (!id) {
                throw new Error('ID is required to retrieve an ArtistProfile');
            }
            
            try {
                // Retrieve a specific ArtistProfile by ID
                return await context.dataSources.artistProfileAPI.getArtistProfileById(id);
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching Artist Profile');
            }
        },
        artistProfiles: async (_, __, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_ARTIST_PROFILES')) {
                throw new Error('Unauthorized');
            }
            
            try {
                // Retrieve all ArtistProfiles
                return await context.dataSources.artistProfileAPI.getAllArtistProfiles();
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching Artist Profiles');
            }
        },
    },
    ArtistProfile: {
        user: async (artistProfile, _, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_USER')) {
                throw new Error('Unauthorized');
            }
            
            try {
                // Resolve the user (User) associated with the ArtistProfile
                return await context.dataSources.userAPI.getUserById(artistProfile.userId);
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching associated User');
            }
        },
        blogs: async (artistProfile, _, context) => {
            // You might want to add appropriate authentication and authorization here as well
            try {
                // Resolve the blogs (ArtistBlog[]) associated with the ArtistProfile
                return await context.dataSources.artistBlogAPI.getBlogsByArtistId(artistProfile.id);
            } catch (error) {
                console.error(error);
                throw new Error('An error occurred while fetching associated Blogs');
            }
        },
        collabRequests: async (artistProfile, _, context) => {
            // You might want to add appropriate authentication and authorization here as well
            try {
                // Resolve the collabRequests (ArtistCollabRequest[]) associated with the ArtistProfile
                return await context.dataSources.artistCollabRequestAPI.getCollabRequestsByArtistId(artistProfile.id);
            } catch (error) {
                console.error(error);
                throw new Error('An error occurred while fetching associated Collab Requests');
            }
        },
        // Resolve other associated types similarly with error handling and possibly authentication & authorization
    },
};

module.exports = artistProfileResolver;
