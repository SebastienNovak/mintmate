const soundPackResolver = {
    Query: {
      soundPack: async (_, { id }, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
          
          // Validation: Ensure ID is provided.
          if (!id) throw new Error('Bad Request: ID must be provided');
          
          // Replace with your actual logic to retrieve the SoundPack by id.
          const soundPack = await context.dataSources.soundPackAPI.getSoundPackById(id);
          
          // Validation: Ensure SoundPack exists.
          if (!soundPack) throw new Error('Not Found: SoundPack does not exist');
          
          return soundPack;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching SoundPack');
        }
      },
      soundPacks: async (_, __, context) => {
        try {
          // Authentication: Optionally, Ensure the user is logged in.
          // if (!context.user) throw new Error('Unauthorized: Must be logged in');
          
          // Replace with your actual logic to retrieve all SoundPacks.
          const soundPacks = await context.dataSources.soundPackAPI.getAllSoundPacks();
          
          // Validation: Ensure SoundPacks exist.
          if (!soundPacks || soundPacks.length === 0) throw new Error('Not Found: No SoundPacks available');
          
          return soundPacks;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching SoundPacks');
        }
      },
    },
  };
  
  module.exports = soundPackResolver;
  