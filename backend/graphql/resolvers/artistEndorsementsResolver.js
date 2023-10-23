const artistEndorsementResolver = {
    Query: {
        artistEndorsement: async (_, { id }, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_ARTIST_ENDORSEMENT')) {
                throw new Error('Unauthorized');
            }
            
            // Input Validation
            if (!id) {
                throw new Error('ID is required to retrieve an ArtistEndorsement');
            }
            
            try {
                // Retrieve a specific ArtistEndorsement by ID
                return await context.dataSources.artistEndorsementAPI.getArtistEndorsementById(id);
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching Artist Endorsement');
            }
        },
        artistEndorsements: async (_, __, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_ARTIST_ENDORSEMENTS')) {
                throw new Error('Unauthorized');
            }
            
            try {
                // Retrieve all ArtistEndorsements
                return await context.dataSources.artistEndorsementAPI.getAllArtistEndorsements();
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching Artist Endorsements');
            }
        },
    },
    ArtistEndorsement: {
        artist: async (artistEndorsement, _, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_ARTIST_PROFILE')) {
                throw new Error('Unauthorized');
            }
            
            try {
                // Resolve the artist (ArtistProfile) associated with the ArtistEndorsement
                return await context.dataSources.artistProfileAPI.getArtistProfileById(artistEndorsement.artistId);
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching associated Artist Profile');
            }
        },
    },
};

module.exports = artistEndorsementResolver;
