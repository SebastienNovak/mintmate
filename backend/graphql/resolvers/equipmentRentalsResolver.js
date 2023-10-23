const equipmentRentalResolver = {
    Query: {
      equipmentRental: async (_, { id }, context) => {
        // Authentication
        if (!context.user) throw new Error('Unauthorized: Must be logged in');
  
        try {
          // Retrieve a specific EquipmentRental by ID
          const equipmentRental = await context.dataSources.equipmentRentalAPI.getEquipmentRentalById(id);
  
          // Validation
          if (!equipmentRental) throw new Error('Not Found: EquipmentRental does not exist');
  
          // Authorization: Only the users involved in the rental or an admin can view the equipment rental
          const isAuthorized = [equipmentRental.renterId, equipmentRental.ownerId].includes(context.user.id) || context.user.isAdmin;
          if (!isAuthorized) throw new Error('Forbidden: You do not have access to this equipment rental');
  
          return equipmentRental;
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching equipment rental');
        }
      },
      equipmentRentals: async (_, __, context) => {
        // Authentication and Authorization: Only admins can access all equipment rentals
        if (!context.user || !context.user.isAdmin) throw new Error('Unauthorized: Must be an admin to access all equipment rentals');
  
        try {
          return await context.dataSources.equipmentRentalAPI.getAllEquipmentRentals();
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while fetching all equipment rentals');
        }
      },
    },
    Mutation: {
      createEquipmentRental: async (_, { input }, context) => {
        // Authentication
        if (!context.user) throw new Error('Unauthorized: Must be logged in');
        
        try {
          // Replace with your actual logic to create an EquipmentRental in your data source.
          return await context.dataSources.equipmentRentalAPI.createEquipmentRental(input);
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while creating equipment rental');
        }
      },
      updateEquipmentRental: async (_, { id, input }, context) => {
        // Authentication
        if (!context.user) throw new Error('Unauthorized: Must be logged in');
        
        try {
          // Retrieve existing equipment rental
          const equipmentRental = await context.dataSources.equipmentRentalAPI.getEquipmentRentalById(id);
          
          // Validation
          if (!equipmentRental) throw new Error('Not Found: Equipment rental does not exist');
          
          // Authorization: Only the owner or an admin can update the equipment rental details
          const isAuthorized = equipmentRental.ownerId === context.user.id || context.user.isAdmin;
          if (!isAuthorized) throw new Error('Forbidden: You do not have access to update this equipment rental');
  
          // Replace with your actual logic to update an EquipmentRental in your data source.
          return await context.dataSources.equipmentRentalAPI.updateEquipmentRental(id, input);
        } catch (error) {
          console.error(error);
          throw new Error('Error occurred while updating equipment rental');
        }
      },
    },
  };
  
  module.exports = equipmentRentalResolver;
  