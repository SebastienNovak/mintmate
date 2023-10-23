const fs = require('fs');
const path = require('path');
const { gql } = require('apollo-server');

const workshopTypeDefs = gql(fs.readFileSync(path.join(__dirname, '../typeDefs/workshop.gql'), 'utf8'));

const workshopResolver = {
  Query: {
    workshop: async (_, { id }) => {
      try {
        const workshop = await workshopTypeDefs.findByPk(id); // Updated from findById
        if (!workshop) throw new Error(`Workshop with id ${id} not found`);
        return workshop;
      } catch (error) {
        console.error(`Error fetching Workshop with id ${id}:`, error);
        throw new Error('Unable to fetch Workshop');
      }
    },
    workshops: async () => {
      try {
        return await workshopTypeDefs.findAll(); // Updated from find
      } catch (error) {
        console.error('Error fetching all Workshops:', error);
        throw new Error('Unable to fetch Workshops');
      }
    }
  },
  
  Mutation: {
    createWorkshop: async (_, { input }) => {
      try {
        const workshop = await workshopTypeDefs.create(input);
        if (!workshop) throw new Error('Failed to create Workshop');
        return workshop;
      } catch (error) {
        console.error('Error creating Workshop:', error);
        throw new Error('Unable to create Workshop');
      }
    }
  },
};

module.exports = workshopResolver;
