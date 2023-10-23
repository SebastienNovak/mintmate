const commentResolver = {
    Query: {
      comment: async (_, { id }, context) => {
        // Authentication
        if (!context.user) throw new Error('Unauthorized: Must be logged in');

        try {
          // Retrieve a specific comment by ID
          const comment = await context.dataSources.commentAPI.getCommentById(id);

          // Validation
          if (!comment) throw new Error('Not Found: Comment does not exist');

          // Authorization: User should be the author of the comment or an admin
          const isAuthorized = context.user.id === comment.userId || context.user.isAdmin;
          if (!isAuthorized) throw new Error('Forbidden: You do not have access to this comment');

          return comment;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching comment');
        }
      },
      allComments: async (_, __, context) => {
        // Authentication and Authorization: Only admins can access all comments
        if (!context.user || !context.user.isAdmin) throw new Error('Unauthorized: Must be an admin to access all comments');
        
        try {
          return await context.dataSources.commentAPI.getAllComments();
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching all comments');
        }
      },
    },
    Comment: {
      user: async (parent, _, context) => {
        try {
          return await context.dataSources.userAPI.getUserById(parent.userId);
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching the user of the comment');
        }
      },
      nft: async (parent, _, context) => {
        try {
          return parent.nftId ? await context.dataSources.nftAPI.getNftById(parent.nftId) : null;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching the NFT of the comment');
        }
      },
      album: async (parent, _, context) => {
        try {
          return parent.albumId ? await context.dataSources.albumAPI.getAlbumById(parent.albumId) : null;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching the album of the comment');
        }
      },
      event: async (parent, _, context) => {
        try {
          return parent.eventId ? await context.dataSources.eventAPI.getEventById(parent.eventId) : null;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching the event of the comment');
        }
      },
    },
  };
  
  module.exports = commentResolver;
