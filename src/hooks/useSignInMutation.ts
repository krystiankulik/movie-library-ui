import gql from "graphql-tag";
import {FetchResult, MutationResult, useMutation} from "@apollo/client";
import {useAuthToken} from "./useAuthToken";
import {UserInfo} from "../apiSchema";

export const loginMutationGQL = gql`
    mutation login($username: String!, $password: String!) {
        login( username: $username, password: $password ) {
            token,
            user {
                id,
                username
            }
        }
    }
`;

interface LoginInput {
    username: string;
    password: string;
}

interface LoggedUser {
    token: string;
    user: UserInfo;
}


export const useSignInMutation = (): [(username: string, password: string) => Promise<FetchResult>, MutationResult] => {
    const [, setAuthToken, removeAuthToken] = useAuthToken();

    const [mutation, mutationResults] = useMutation<{ login: LoggedUser }, LoginInput>(loginMutationGQL, {
        onCompleted: (data) => {
            setAuthToken(data.login.token);
        },
    });

    const signIn = (username: string, password: string) => {
        removeAuthToken();
        return mutation({
            variables: {
                username,
                password,
            },
        });
    }
    return [signIn, mutationResults]
};
