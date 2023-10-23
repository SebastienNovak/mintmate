const merchandiseResolver = {
    Merchandise: {
      artist: async (parent, _, context) => {
        try {
          // Authentication: Ensure the user is logged in if required
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
          
          // The parent parameter represents the current Merchandise object.
          const merchandiseId = parent.id;
  
          // Validation: Optionally ensure that Merchandise exists in your data source if needed.
          const merchandise = await context.dataSources.merchAPI.getMerchandiseById(merchandiseId);
          if (!merchandise) throw new Error('Not Found: Merchandise does not exist');
  
          // Replace with your actual logic to retrieve the associated ArtistProfile.
          return context.dataSources.artistAPI.getArtistByMerchandiseId(merchandiseId);
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Artist for this Merchandise');
        }
      },
      customizedMerches: async (parent, _, context) => {
        try {
          // Authentication: Ensure the user is logged in if required
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          const merchandiseId = parent.id;
  
          // Validation: Optionally ensure that Merchandise exists in your data source if needed.
          const merchandise = await context.dataSources.merchAPI.getMerchandiseById(merchandiseId);
          if (!merchandise) throw new Error('Not Found: Merchandise does not exist');
  
          // Replace with your actual logic to retrieve the associated CustomizedMerches.
          return context.dataSources.merchAPI.getCustomizedMerchesByMerchandiseId(merchandiseId);
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Customized Merchandise');
        }
      },
    },
  };
  
  module.exports = merchandiseResolver;
  