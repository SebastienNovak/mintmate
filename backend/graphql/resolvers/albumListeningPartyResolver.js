const albumListeningPartyResolver = {
    Query: {
        albumListeningParty: async (_, { id }, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_ALBUM_LISTENING_PARTY')) {
                throw new Error('Unauthorized');
            }
            
            // Input Validation
            if (!id) {
                throw new Error('ID is required to retrieve an AlbumListeningParty');
            }
            
            try {
                // Retrieving a specific AlbumListeningParty by ID
                return await context.dataSources.albumListeningPartyAPI.getAlbumListeningPartyById(id);
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching Album Listening Party');
            }
        },
        albumListeningParties: async (_, __, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_ALBUM_LISTENING_PARTIES')) {
                throw new Error('Unauthorized');
            }

            try {
                // Retrieving all AlbumListeningParties
                return await context.dataSources.albumListeningPartyAPI.getAllAlbumListeningParties();
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching Album Listening Parties');
            }
        },
    },
    AlbumListeningParty: {
        album: async (albumListeningParty, _, context) => {
            // Authentication and Authorization
            // Depending on your use case, you may need to check permissions here as well
            if (!context.user || !context.user.hasPermission('READ_ALBUM')) {
                throw new Error('Unauthorized');
            }

            try {
                // Resolving the album associated with the AlbumListeningParty
                return await context.dataSources.albumAPI.getAlbumById(albumListeningParty.albumId);
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching associated Album');
            }
        },
    },
};

module.exports = albumListeningPartyResolver;
