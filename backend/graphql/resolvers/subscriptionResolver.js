const subscriptionResolver = {
    Query: {
      subscription: async (_, { id }, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
          
          // Validation: Ensure ID is provided.
          if (!id) throw new Error('Bad Request: ID must be provided');
          
          // Replace with your actual logic to retrieve the Subscription by id.
          const subscription = await context.dataSources.subscriptionAPI.getSubscriptionById(id);
          
          // Validation: Ensure Subscription exists.
          if (!subscription) throw new Error('Not Found: Subscription does not exist');
          
          // Authorization: Optionally, Ensure the logged-in user has permission to view the Subscription.
          // if (context.user.id !== subscription.userId) throw new Error('Forbidden: You do not have permission');
          
          return subscription;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Subscription');
        }
      },
      subscriptions: async (_, __, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
          
          // Replace with your actual logic to retrieve all Subscriptions.
          const subscriptions = await context.dataSources.subscriptionAPI.getAllSubscriptions();
          
          // Validation: Ensure Subscriptions exist.
          if (!subscriptions || subscriptions.length === 0) throw new Error('Not Found: No Subscriptions available');
          
          return subscriptions;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Subscriptions');
        }
      },
    },
  };
  
  module.exports = subscriptionResolver;
  