const chatResolver = {
    Query: {
        chat: async (_, { id }, context) => {
            // Authentication
            if (!context.user) throw new Error('Unauthorized: Must be logged in');

            // Authorization: only participants of the chat or admins can view the chat
            const chat = await context.dataSources.chatAPI.getChatById(id);
            if (!chat) throw new Error('Chat not found');

            const hasAccess = [chat.senderId, chat.receiverId].includes(context.user.id) || context.user.isAdmin;
            if (!hasAccess) throw new Error('Forbidden: You do not have access to this chat');

            // Return the chat if authorized
            return chat;
        },
        allChats: async (_, __, context) => {
            // Authentication and Authorization: only admins can access all chats
            if (!context.user || !context.user.isAdmin) throw new Error('Unauthorized: Must be an admin to access all chats');
            
            try {
                return await context.dataSources.chatAPI.getAllChats();
            } catch (error) {
                console.error(error);
                throw new Error('Error occurred while fetching all chats');
            }
        },
    },
    Chat: {
        sender: async (parent, _, context) => {
            try {
                return await context.dataSources.userAPI.getUserById(parent.senderId);
            } catch (error) {
                console.error(error);
                throw new Error('Error occurred while fetching the sender of the chat');
            }
        },
        receiver: async (parent, _, context) => {
            try {
                return await context.dataSources.userAPI.getUserById(parent.receiverId);
            } catch (error) {
                console.error(error);
                throw new Error('Error occurred while fetching the receiver of the chat');
            }
        },
    }
};

module.exports = chatResolver;
