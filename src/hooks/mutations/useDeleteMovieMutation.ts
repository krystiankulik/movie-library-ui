import gql from "graphql-tag";
import {FetchResult, MutationResult, useMutation} from "@apollo/client";
import {MovieInfo} from "../../apiSchema";
import {GET_ALL_ITEMS} from "../queries/useGetAllMoviesQuery";

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

    const [mutation, mutationResults] = useMutation<{ removeMovie: MovieDeletionInfo }, { movieId: string }>(removeMovieMutationGQL, {
        update(cache, mutationResult) {
            const data: { getAllMovies: MovieInfo[] } | null = cache.readQuery({
                query: GET_ALL_ITEMS
            });
            const filteredMovies = (data?.getAllMovies ?? []).filter(movie => movie.id !== mutationResult.data?.removeMovie.id);
            cache.modify({
                fields: {
                    getAllMovies(existingMovies: MovieInfo[] = []) {
                        return filteredMovies
                    }
                }
            })
        }

    });

    const deleteMovie = (movieId: string) => {
        return mutation({
            variables: {
                movieId
            },
        });
    }
    return [deleteMovie, mutationResults]
};
