import {ApolloClient, ApolloLink, HttpLink, InMemoryCache, NormalizedCacheObject, split} from "@apollo/client";
import {useAuthToken} from "./useAuthToken";
import {WebSocketLink} from "@apollo/client/link/ws";
import {getMainDefinition} from "@apollo/client/utilities";

const BACKEND_SERVICE = "46.101.123.165";
const BACKEND_LOCAL_SERVICE = "localhost";

const httpLink = new HttpLink({uri: `http://${BACKEND_LOCAL_SERVICE}:3001/v1/graphql`});

const wsLink = (authToken: string) => new WebSocketLink({
    uri: `ws://${BACKEND_LOCAL_SERVICE}:3001/graphql`,
    options: {
        reconnect: true
    },
    connectionParams: {
        authToken: authToken,
    }
});

const mainLink = (authToken: string) => split(
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
        Query: {
            fields: {
                getAllMovies: {
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
        link: mainLink(authToken),
        cache,
    });
};
