const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const db = require('../services/database-service/models'); // Adjust this path as needed
const { typeDefs, resolvers } = require('./schema'); // Adjust this path as needed

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: { db }
});

(async () => {
    try {
        await server.start();
        server.applyMiddleware({ app, path: '/graphql' });
        // Then start your express app or perform other setups
        } catch (error) {
        console.error('Error starting Apollo Server', error);
        }
    })();

// server.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
});
