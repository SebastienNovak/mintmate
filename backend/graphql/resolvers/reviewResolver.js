const reviewResolver = {
    Query: {
      review: async (_, { id }, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
          
          // Validation: Ensure ID is provided.
          if (!id) throw new Error('Bad Request: ID must be provided');
          
          // Replace with your actual logic to retrieve the Review by id.
          const review = await context.dataSources.reviewAPI.getReviewById(id);
          
          // Validation: Ensure Review exists.
          if (!review) throw new Error('Not Found: Review does not exist');
          
          return review;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Review');
        }
      },
      reviews: async (_, { type, userId, trackId, albumId }, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
          
          // Validation: Ensure the required parameters are provided.
          if (!type && !userId && !trackId && !albumId) 
            throw new Error('Bad Request: At least one parameter (type, userId, trackId, albumId) must be provided');
          
          // Replace with your actual logic to retrieve the Reviews by type, userId, trackId, and/or albumId.
          const reviews = await context.dataSources.reviewAPI.getReviews({ type, userId, trackId, albumId });
          
          // Validation: Ensure Reviews exist.
          if (!reviews || reviews.length === 0) throw new Error('Not Found: No Reviews available');
          
          return reviews;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Reviews');
        }
      },
    },
    Review: {
      user: async (parent, _, context) => {
        try {
          // Validation: Ensure parent.userId is provided.
          if (!parent.userId) throw new Error('Bad Request: userId must be provided in parent object');
          
          // Replace with your actual logic to retrieve the User by parent.userId
          const user = await context.dataSources.userAPI.getUserById(parent.userId);
          
          // Validation: Ensure User exists.
          if (!user) throw new Error('Not Found: User does not exist');
          
          return user;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching User for Review');
        }
      },
      track: async (parent, _, context) => {
        try {
          // If there's no trackId in parent, return null or handle it accordingly
          if (!parent.trackId) return null;
          
          // Replace with your actual logic to retrieve the Track by parent.trackId
          const track = await context.dataSources.trackAPI.getTrackById(parent.trackId);
          
          // Validation: Ensure Track exists.
          if (!track) throw new Error('Not Found: Track does not exist');
          
          return track;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Track for Review');
        }
      },
      album: async (parent, _, context) => {
        try {
          // If there's no albumId in parent, return null or handle it accordingly
          if (!parent.albumId) return null;
          
          // Replace with your actual logic to retrieve the Album by parent.albumId
          const album = await context.dataSources.albumAPI.getAlbumById(parent.albumId);
          
          // Validation: Ensure Album exists.
          if (!album) throw new Error('Not Found: Album does not exist');
          
          return album;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Album for Review');
        }
      },
    },
  };
  
  module.exports = reviewResolver;
  