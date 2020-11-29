import {gql, QueryResult, useQuery} from "@apollo/client";

const CURRENT_USER_QUERY = gql`
    query currentUSer {
        currentUser {
            username
        }
    }
`

export interface CurrentUserResponse {
    currentUser: { username: string };
}

export const useCurrentUserQuery = (): QueryResult<CurrentUserResponse> => {
    return useQuery<CurrentUserResponse>(CURRENT_USER_QUERY);

}
