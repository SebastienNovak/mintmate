const nftResolver = {
  Query: {
    nft: async (_, { id }, context) => {
      try {
        // Authentication: Ensure the user is logged in if required.
        if (!context.user) throw new Error('Unauthorized: Must be logged in');

        // Validation: Ensure ID is provided.
        if (!id) throw new Error('Bad Request: ID must be provided');

        // Replace with your actual logic to retrieve the NFT by id.
        const nft = await context.dataSources.nftAPI.getNFTById(id);

        // Validation: Ensure NFT exists.
        if (!nft) throw new Error('Not Found: NFT does not exist');

        return nft;
      } catch (error) {
        console.error(error);
        throw new Error('Error occurred while fetching NFT');
      }
    },
    nfts: async (_, __, context) => {
      try {
        // Authentication: Ensure the user is logged in if required.
        if (!context.user) throw new Error('Unauthorized: Must be logged in');

        // Replace with your actual logic to retrieve all NFTs.
        const nfts = await context.dataSources.nftAPI.getAllNFTs();

        // Validation: Ensure NFTs exist.
        if (!nfts || nfts.length === 0) throw new Error('Not Found: No NFTs available');

        return nfts;
      } catch (error) {
        console.error(error);
        throw new Error('Error occurred while fetching NFTs');
      }
    },
  },
  NFT: {
    user: async (nft, _, context) => {
      try {
        // Authentication: Ensure the user is logged in if required.
        if (!context.user) throw new Error('Unauthorized: Must be logged in');

        // Validation: Ensure userId exists on NFT object.
        if (!nft.userId) throw new Error('Bad Request: NFT userId must be provided');

        // Replace with your actual logic to get the User associated with the NFT.
        const user = await context.dataSources.userAPI.getUserById(nft.userId);

        // Validation: Ensure User exists.
        if (!user) throw new Error('Not Found: User does not exist');

        return user;
      } catch (error) {
        console.error(error);
        throw new Error('Error occurred while fetching User associated with NFT');
      }
    },
    comments: async (nft, _, context) => {
      try {
        // Authentication: Ensure the user is logged in if required.
        if (!context.user) throw new Error('Unauthorized: Must be logged in');

        // Validation: Ensure id exists on NFT object.
        if (!nft.id) throw new Error('Bad Request: NFT id must be provided');

        // Replace with your actual logic to get the Comments associated with the NFT.
        const comments = await context.dataSources.commentAPI.getCommentsByNFTId(nft.id);

        // Validation: Ensure Comments exist.
        if (!comments || comments.length === 0) throw new Error('Not Found: No Comments available for the NFT');

        return comments;
      } catch (error) {
        console.error(error);
        throw new Error('Error occurred while fetching Comments associated with NFT');
      }
    },
  },
};

module.exports = nftResolver;
