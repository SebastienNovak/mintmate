const artistDiaryResolver = {
    Query: {
        artistDiary: async (_, { id }, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_ARTIST_DIARY')) {
                throw new Error('Unauthorized');
            }
            
            // Input Validation
            if (!id) {
                throw new Error('ID is required to retrieve an ArtistDiary');
            }
            
            try {
                // Retrieve a specific ArtistDiary by ID
                return await context.dataSources.artistDiaryAPI.getArtistDiaryById(id);
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching Artist Diary');
            }
        },
        artistDiaries: async (_, __, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_ARTIST_DIARIES')) {
                throw new Error('Unauthorized');
            }
            
            try {
                // Retrieve all ArtistDiaries
                return await context.dataSources.artistDiaryAPI.getAllArtistDiaries();
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching Artist Diaries');
            }
        },
    },
    ArtistDiary: {
        artist: async (artistDiary, _, context) => {
            // Authentication and Authorization
            if (!context.user || !context.user.hasPermission('READ_ARTIST_PROFILE')) {
                throw new Error('Unauthorized');
            }
            
            try {
                // Resolve the artist (ArtistProfile) associated with the ArtistDiary
                return await context.dataSources.artistProfileAPI.getArtistProfileById(artistDiary.artistId);
            } catch (error) {
                // Logging and Error Handling
                console.error(error);
                throw new Error('An error occurred while fetching associated Artist Profile');
            }
        },
    },
};

module.exports = artistDiaryResolver;
