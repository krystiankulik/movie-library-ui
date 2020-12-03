import gql from "graphql-tag";
import {FetchResult, MutationResult, useMutation} from "@apollo/client";

export const removeMovieMutationGQL = gql`
    mutation removeMovie($movieId: String!) {
        removeMovie(movieId: $movieId) {
            id
        }
    }
`;

interface MovieDeletionInfo {
    id: string;
}

export const useDeleteMovieMutation = (): [(movieId: string) => Promise<FetchResult<any>>, MutationResult] => {

    const [mutation, mutationResults] = useMutation<{ removeMovie: MovieDeletionInfo }, { movieId: string }>(removeMovieMutationGQL);

    const deleteMovie = (movieId: string) => {
        return mutation({
            variables: {
                movieId
            },
        });
    }
    return [deleteMovie, mutationResults]
};
