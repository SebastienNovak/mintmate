import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
    uri: "YOUR_GRAPHQL_ENDPOINT_HERE",
});

export const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});
