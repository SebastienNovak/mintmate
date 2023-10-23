const albumConceptsResolver = {
    Query: {
      albumConcept: async (_, { id }, context) => {
        try {
          // Input sanitization and validation (example: ensure id is a valid format)
          if (!isValidId(id)) throw new Error('Invalid ID format');

          // Authentication and Authorization
          if (!context.user || !context.user.hasPermission('READ_ALBUM_CONCEPT')) {
            throw new Error('Unauthorized');
        }
          // Retrieve a specific AlbumConcept by ID
          const albumConcept = await context.dataSources.albumConceptAPI.getAlbumConceptById(id);
          
          // Data validation (example: ensure data exists)
          if (!albumConcept) throw new Error('Album Concept not found');
          
          return albumConcept;
        } catch (error) {
          console.error('Error retrieving album concept:', error);
          throw new Error('Error retrieving album concept'); // General error message to client
        }
      },
      albumConcepts: async (_, __, context) => {
        try {
          // Retrieve all AlbumConcepts
          const albumConcepts = await context.dataSources.albumConceptAPI.getAllAlbumConcepts();
  
          return albumConcepts || [];
        } catch (error) {
          console.error('Error retrieving album concepts:', error);
          throw new Error('Error retrieving album concepts'); // General error message to client
        }
      },
    },
    AlbumConcept: {
      artist: async (albumConcept, _, context) => {
        try {
          // Data validation (example: ensure artistId exists)
          if (!albumConcept.artistId) throw new Error('Missing artistId');
  
          // Retrieve the artist associated with the AlbumConcept
          const artist = await context.dataSources.artistAPI.getArtistById(albumConcept.artistId);
          
          // Data validation (example: ensure artist data exists)
          if (!artist) throw new Error('Artist not found');
          
          return artist;
        } catch (error) {
          console.error('Error retrieving artist for album concept:', error);
          throw new Error('Error retrieving artist for album concept'); // General error message to client
        }
      },
    },
  };
  
  module.exports = albumConceptsResolver;
  