const storyResolver = {
    Query: {
      story: async (_, { id }, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
          
          // Validation: Ensure ID is provided.
          if (!id) throw new Error('Bad Request: ID must be provided');
          
          // Replace with your actual logic to retrieve the Story by id.
          const story = await context.dataSources.storyAPI.getStoryById(id);
          
          // Validation: Ensure Story exists.
          if (!story) throw new Error('Not Found: Story does not exist');
          
          return story;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Story');
        }
      },
      stories: async (_, __, context) => {
        try {
          // Authentication: Optionally, Ensure the user is logged in.
          // if (!context.user) throw new Error('Unauthorized: Must be logged in');
          
          // Replace with your actual logic to retrieve all Stories.
          const stories = await context.dataSources.storyAPI.getAllStories();
          
          // Validation: Ensure Stories exist.
          if (!stories || stories.length === 0) throw new Error('Not Found: No Stories available');
          
          return stories;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Stories');
        }
      },
    },
  };
  
  module.exports = storyResolver;
  