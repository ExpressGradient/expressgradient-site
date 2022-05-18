import { GraphQLClient } from "graphql-request";

const endpoint = process.env.GRAPHQL_ENDPOINT;

const client = new GraphQLClient(endpoint, {
    headers: {
        Authorization: `Bearer ${process.env.GRAPHQL_API_KEY}`,
    },
});

export default client;
