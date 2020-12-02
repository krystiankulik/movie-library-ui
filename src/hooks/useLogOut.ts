import {useAuthToken} from "./useAuthToken";
import {useApolloClient} from "@apollo/client";

export const useLogout = () => {
    const [, , removeAuthToken] = useAuthToken();
    const apolloClient = useApolloClient();

    return async () => {
        await apolloClient.clearStore(); // we remove all information in the store
        removeAuthToken(); //we clear the authToken
    };
};
