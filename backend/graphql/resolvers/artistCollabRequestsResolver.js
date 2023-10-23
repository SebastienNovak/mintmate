const artistCollabRequestResolver = {
    Query: {
        artistCollabRequest: async (_, { id }, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_ARTIST_COLLAB_REQUEST')) {
                throw new Error('Unauthorized');
            }
            
            // Input Validation
            if (!id) {
                throw new Error('ID is required to retrieve an ArtistCollabRequest');
            }
            
            try {
                // Retrieve a specific ArtistCollabRequest by ID
                return await context.dataSources.artistCollabRequestAPI.getArtistCollabRequestById(id);
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching Artist Collab Request');
            }
        },
        artistCollabRequests: async (_, __, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_ARTIST_COLLAB_REQUESTS')) {
                throw new Error('Unauthorized');
            }
            
            try {
                // Retrieve all ArtistCollabRequests
                return await context.dataSources.artistCollabRequestAPI.getAllArtistCollabRequests();
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching Artist Collab Requests');
            }
        },
    },
    ArtistCollabRequest: {
        artist: async (artistCollabRequest, _, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_ARTIST_PROFILE')) {
                throw new Error('Unauthorized');
            }
            
            try {
                // Resolve the artist (ArtistProfile) associated with the ArtistCollabRequest
                return await context.dataSources.artistProfileAPI.getArtistProfileById(artistCollabRequest.artistId);
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching associated Artist Profile');
            }
        },
    },
};

module.exports = artistCollabRequestResolver;
