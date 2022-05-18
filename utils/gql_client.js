import { GraphQLClient } from "graphql-request";

const endpoint = process.env.GRAPHQL_ENDPOINT;

const client = new GraphQLClient(endpoint);

export default client;
