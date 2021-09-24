import {ApolloClient, InMemoryCache} from "@apollo/client";

const api_url = "http://localhost:3000/graph";
export const client = new ApolloClient({
    uri: api_url,
    cache: new InMemoryCache()
});
