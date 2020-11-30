import gql from "graphql-tag";
import {FetchResult, MutationResult, useMutation} from "@apollo/client";
import {UserInfo} from "../../apiSchema";

export const registerMutationGQL = gql`
    mutation register($username: String!, $password: String!) {
        register( username: $username, password: $password ) {
            id,
            username
        }
    }
`;

interface RegisterInput {
    username: string;
    password: string;
}

export const useRegisterMutation = (): [(username: string, password: string) => Promise<FetchResult>, MutationResult] => {

    const [mutation, mutationResults] = useMutation<{ register: UserInfo }, RegisterInput>(registerMutationGQL);

    const register = (username: string, password: string) => {
        return mutation({
            variables: {
                username,
                password,
            },
        });
    }
    return [register, mutationResults]
};
