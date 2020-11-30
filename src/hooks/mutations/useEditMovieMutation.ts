import gql from "graphql-tag";
import {FetchResult, MutationResult, useMutation} from "@apollo/client";
import {MovieInfo} from "../../apiSchema";

export const editMovieMutationGQL = gql`
    mutation editMovie($input: EditMovieInput!) {
        editMovie(input: $input) {
            id,
            name,
            releaseDate,
            duration,
            username,
            actors,
            averageNote
            ratings {
                username,
                note,
                comment
            }
        }
    }
`;

interface EditMovieInput {
    movieId: string;
    name: string;
    releaseDate: string;
    duration: number;
    actors: string[];
}

export const useEditMovieMutation = (): [(movieId: string, name: string, releaseDate: string, duration: number, actors: string[])
    => Promise<FetchResult>, MutationResult] => {

    const [mutation, mutationResults] = useMutation<{ editMovie: MovieInfo }, { input: EditMovieInput }>(editMovieMutationGQL);

    const editMovie = (movieId: string, name: string, releaseDate: string, duration: number, actors: string[]) => {
        return mutation({
            variables: {
                input: {
                    movieId,
                    name,
                    releaseDate,
                    duration,
                    actors
                }
            },
        });
    }
    return [editMovie, mutationResults]
};
