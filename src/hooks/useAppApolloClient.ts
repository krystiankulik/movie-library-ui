import {ApolloClient, ApolloLink, HttpLink, InMemoryCache, NormalizedCacheObject, split} from "@apollo/client";
import {useAuthToken} from "./useAuthToken";
import {WebSocketLink} from "@apollo/client/link/ws";
import {getMainDefinition} from "@apollo/client/utilities";

const httpLink = new HttpLink({uri: 'http://localhost:3300/v1/graphql'});

const wsLink = (authToken: string) => new WebSocketLink({
    uri: 'ws://localhost:3300/graphql',
    options: {
        reconnect: true
    },
    connectionParams: {
        authToken: authToken,
    }
});

const link = (authToken: string) => split(
    ({query}) => {
        const definition = getMainDefinition(query)
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
    },
    wsLink(authToken),
    authMiddleware(authToken).concat(httpLink)
)

const authMiddleware = (authToken: string) =>
    new ApolloLink((operation, forward) => {
        // add the authorization to the headers
        if (authToken) {
            operation.setContext({
                headers: {
                    authorization: `Bearer ${authToken}`,
                },
            });
        }

        return forward(operation);
    });

const cache = new InMemoryCache({
    typePolicies: {
        Movie: {
            fields: {
                actors: {
                    merge(existing, incoming) {
                        return incoming
                    }
                }
            }
        }
    }
});

export const useAppApolloClient = (): ApolloClient<NormalizedCacheObject> => {
    const [authToken] = useAuthToken();
    return new ApolloClient({
        link: link(authToken),
        cache,
    });
};
