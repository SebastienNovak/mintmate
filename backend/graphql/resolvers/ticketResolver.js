const ticketResolver = {
    Query: {
      ticket: async (_, { id }, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
          
          // Validation: Ensure ID is provided.
          if (!id) throw new Error('Bad Request: ID must be provided');
          
          // Replace with your actual logic to retrieve the Ticket by id.
          const ticket = await context.dataSources.ticketAPI.getTicketById(id);
          
          // Validation: Ensure Ticket exists.
          if (!ticket) throw new Error('Not Found: Ticket does not exist');
          
          // Authorization: Optionally, Ensure the logged-in user has permission to view the Ticket.
          // if (context.user.id !== ticket.userId) throw new Error('Forbidden: You do not have permission');
          
          return ticket;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Ticket');
        }
      },
      tickets: async (_, __, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
          
          // Replace with your actual logic to retrieve all Tickets.
          const tickets = await context.dataSources.ticketAPI.getAllTickets();
          
          // Validation: Ensure Tickets exist.
          if (!tickets || tickets.length === 0) throw new Error('Not Found: No Tickets available');
          
          return tickets;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching Tickets');
        }
      },
    },
    Ticket: {
      event: async (parent, _, context) => {
        try {
          // Authentication: Ensure the user is logged in.
          if (!context.user) throw new Error('Unauthorized: Must be logged in');
          
          // Validation: Ensure parent.eventId is provided and valid.
          if (!parent.eventId) throw new Error('Bad Request: Invalid Event ID');
          
          // Replace with your actual logic to retrieve the associated Event.
          const event = await context.dataSources.eventAPI.getEventById(parent.eventId);
          
          // Validation: Ensure Event exists.
          if (!event) throw new Error('Not Found: Event does not exist');
          
          return event;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching associated Event');
        }
      },
    },
  };
  
  module.exports = ticketResolver;
  