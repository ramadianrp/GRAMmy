import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";

const httpLink = createHttpLink({
    uri: "https://ff8d-104-28-204-82.ngrok-free.app",
});

const authLink = setContext(async (_, { headers }) => {
    const token = await SecureStore.getItemAsync("accessToken");

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});
const client = new ApolloClient({
    uri: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client