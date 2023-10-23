const triviaResolver = {
    Query: {
      trivia: async (_, { id }, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          // Validation: Ensure ID is provided.
          if (!id) throw new Error('Bad Request: ID must be provided');
  
          // Replace with your actual logic to retrieve the Trivia by id.
          const trivia = await context.dataSources.triviaAPI.getTriviaById(id);
  
          // Validation: Ensure Trivia exists.
          if (!trivia) throw new Error('Not Found: Trivia does not exist');
  
          return trivia;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Trivia');
        }
      },
      trivias: async (_, __, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          // Replace with your actual logic to retrieve all Trivias.
          const trivias = await context.dataSources.triviaAPI.getAllTrivias();
  
          // Validation: Ensure Trivias exist.
          if (!trivias || trivias.length === 0) throw new Error('Not Found: No Trivias available');
  
          return trivias;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Trivias');
        }
      },
    },
    Mutation: {
      createTrivia: async (_, { input }, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          // Authorization: Optionally, ensure the logged-in user has permission to create Trivia.
          // if (!context.user.canCreateTrivia) throw new Error('Forbidden: You do not have permission');
  
          // Validation: Optionally, validate the input before creating Trivia.
          // if (!isValid(input)) throw new Error('Bad Request: Invalid input');
  
          // Replace with your actual logic to create a new Trivia.
          const trivia = await context.dataSources.triviaAPI.createTrivia(input);
  
          // Validation: Ensure Trivia was created successfully.
          if (!trivia) throw new Error('Bad Request: Error creating Trivia');
  
          return trivia;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while creating Trivia');
        }
      },
    },
  };
  
  module.exports = triviaResolver;
  