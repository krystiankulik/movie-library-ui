import {useAuthToken} from "./useAuthToken";
import {useApolloClient} from "@apollo/client";

export const useLogout = () => {
    const [, , removeAuthToken] = useAuthToken();
    const apolloClient = useApolloClient();

    return async () => {
        removeAuthToken();
        await apolloClient.clearStore();
    };
};
