const bcrypt = require('bcryptjs');

const userResolver = {
  Query: {
    user: async (_, { id }, context) => {
      try {
        // Authentication: Ensure the user is logged in.
        if (!context.user) throw new Error('Unauthorized: Must be logged in');

        // Validation: Ensure ID is provided.
        if (!id) throw new Error('Bad Request: ID must be provided');

        // Replace with your actual logic to retrieve the User by id.
        const user = await context.dataSources.userAPI.getUserById(id);

        // Validation: Ensure User exists.
        if (!user) throw new Error('Not Found: User does not exist');

        // Authorization: Optionally, ensure the logged-in user has permission to view this User.
        // if (context.user.id !== id && !context.user.canViewUser) throw new Error('Forbidden: You do not have permission');

        return user;
      } catch (error) {
        console.error(error);
        throw new Error('Error occurred while fetching User');
      }
    },
    users: async (_, __, context) => {
      try {
        // Authentication: Ensure the user is logged in.
        if (!context.user) throw new Error('Unauthorized: Must be logged in');

        // Authorization: Optionally, ensure the logged-in user has permission to view all Users.
        // if (!context.user.canViewUsers) throw new Error('Forbidden: You do not have permission');

        // Replace with your actual logic to retrieve all Users.
        const users = await context.dataSources.userAPI.getAllUsers();

        // Validation: Ensure Users exist.
        if (!users || users.length === 0) throw new Error('Not Found: No Users available');

        return users;
      } catch (error) {
        console.error(error);
        throw new Error('Error occurred while fetching Users');
      }
    },
  },
  User: {
    sentMessages: async (user, _, context) => {
      try {
        // Authentication and Authorization can be applied similarly here if needed.

        // Replace with your actual logic to retrieve sent messages for the user.
        const messages = await context.dataSources.messageAPI.getSentMessagesByUserId(user.id);

        // Validation: Optionally, ensure messages exist.
        // if (!messages || messages.length === 0) throw new Error('Not Found: No sent messages available');

        return messages;
      } catch (error) {
        console.error(error);
        throw new Error('Error occurred while fetching sent messages');
      }
    },
    receivedMessages: async (user, _, context) => {
      try {
        // Authentication and Authorization can be applied similarly here if needed.

        // Replace with your actual logic to retrieve received messages for the user.
        const messages = await context.dataSources.messageAPI.getReceivedMessagesByUserId(user.id);

        // Validation: Optionally, ensure messages exist.
        // if (!messages || messages.length === 0) throw new Error('Not Found: No received messages available');

        return messages;
      } catch (error) {
        console.error(error);
        throw new Error('Error occurred while fetching received messages');
      }
    },
  },
};

module.exports = userResolver;
