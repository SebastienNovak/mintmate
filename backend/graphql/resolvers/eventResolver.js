const eventResolver = {
    Query: {
      event: async (_, { id }, context) => {
        // Authentication
        if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
        try {
          // Retrieve a specific Event by ID
          const event = await context.dataSources.eventAPI.getEventById(id);
  
          // Validation
          if (!event) throw new Error('Not Found: Event does not exist');
  
          // Authorization: Only the artist hosting the event, attendees, or an admin can view the event details
          const isAuthorized = [event.artistId].concat(event.attendeeIds || []).includes(context.user.id) || context.user.isAdmin;
          if (!isAuthorized) throw new Error('Forbidden: You do not have access to this event');
  
          return event;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching event');
        }
      },
      events: async (_, __, context) => {
        // Authentication
        if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
        try {
          // Authorization: Potentially limit access to certain events based on user role or other criteria
          return await context.dataSources.eventAPI.getAllEvents();
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching all events');
        }
      },
    },
    Event: {
      artist: async (event, _, context) => {
        try {
          // Replace with your actual logic to retrieve the associated ArtistProfile from your data source.
          return await context.dataSources.artistProfileAPI.getArtistProfileById(event.artistId);
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching the artist of the event');
        }
      },
      comments: async (event, _, context) => {
        try {
          // Replace with your actual logic to retrieve the associated Comments from your data source.
          return await context.dataSources.commentAPI.getCommentsByEventId(event.id);
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching the comments of the event');
        }
      },
    },
  };
  
  module.exports = eventResolver;
  