const votingResolver = {
    Query: {
      voting: async (_, { id }, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
          
          // Validation: Ensure ID is provided.
          if (!id) throw new Error('Bad Request: ID must be provided');
          
          // Replace with your actual logic to retrieve the Voting by id.
          const voting = await context.dataSources.votingAPI.getVotingById(id);
          
          // Validation: Ensure Voting exists.
          if (!voting) throw new Error('Not Found: Voting does not exist');
          
          return voting;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Voting');
        }
      },
      votings: async (_, __, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
          
          // Replace with your actual logic to retrieve all Votings.
          const votings = await context.dataSources.votingAPI.getAllVotings();
          
          // Validation: Ensure Votings exist.
          if (!votings || votings.length === 0) throw new Error('Not Found: No Votings available');
          
          return votings;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Votings');
        }
      },
    },
    Mutation: {
      createVoting: async (_, { input }, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
          
          // Authorization: Optionally, ensure the logged-in user has permission to create Votings.
          // if (!context.user.canCreateVoting) throw new Error('Forbidden: You do not have permission');
          
          // Validation: Optionally, validate the input before saving it to the database.
          
          // Replace with your actual logic to create a new Voting.
          return await context.dataSources.votingAPI.createVoting(input);
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while creating Voting');
        }
      },
    },
  };
  
  module.exports = votingResolver;
  