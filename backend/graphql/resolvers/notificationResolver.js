const notificationResolver = {
    Query: {
      notification: async (_, { id }, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          // Validation: Ensure ID is provided.
          if (!id) throw new Error('Bad Request: ID must be provided');
  
          // Replace with your actual logic to retrieve the Notification by id.
          const notification = await context.dataSources.notificationAPI.getNotificationById(id);
  
          // Authorization: Ensure the logged-in user is the owner of the Notification.
          if (notification.userId !== context.user.id) throw new Error('Forbidden: Access is denied');
  
          // Validation: Ensure Notification exists.
          if (!notification) throw new Error('Not Found: Notification does not exist');
  
          return notification;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Notification');
        }
      },
      notifications: async (_, { userId }, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
          // Authorization: Ensure the logged-in user is requesting their own notifications.
          if (userId !== context.user.id) throw new Error('Forbidden: Access is denied');
  
          // Validation: Ensure userId is provided.
          if (!userId) throw new Error('Bad Request: userId must be provided');
  
          // Replace with your actual logic to retrieve all Notifications for a user.
          const notifications = await context.dataSources.notificationAPI.getNotificationsByUserId(userId);
  
          // Validation: Ensure Notifications exist.
          if (!notifications || notifications.length === 0) throw new Error('Not Found: No Notifications available');
  
          return notifications;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Notifications');
        }
      },
    },
  };
  
  module.exports = notificationResolver;
  