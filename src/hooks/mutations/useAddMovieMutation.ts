import gql from "graphql-tag";
import {FetchResult, MutationResult, useMutation} from "@apollo/client";
import {MovieInfo} from "../../apiSchema";
import {Dayjs} from "dayjs";
import {utils} from "../../common/utils";

export const addMovieMutationGQL = gql`
    mutation addMovie($input: AddMovieInput!) {
        addMovie(input: $input) {
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

interface AddMovieInput {
    name: string;
    releaseDate: string;
    duration: number;
    actors: string[];
}

export const useAddMovieMutation = (): [(name: string, releaseDate: Dayjs, duration: number, actors: string[])
    => Promise<FetchResult>, MutationResult] => {

    const [mutation, mutationResults] = useMutation<{ addMovie: MovieInfo }, { input: AddMovieInput }>(addMovieMutationGQL, {
        update(cache, mutationResult) {
            cache.modify({
                fields: {
                    getAllMovies(existingMovies: MovieInfo[] = []) {
                        const newMovieRef = cache.writeFragment({
                            data: mutationResult.data?.addMovie,
                            fragment: gql`
                                fragment NewMovie on Movie {
                                    id,
                                    name,
                                    releaseDate,
                                    duration,
                                    actors,
                                    username,
                                    averageNote,
                                    ratings {
                                        username,
                                        note,
                                        comment
                                    },
                                }
                            `
                        })
                        return [...existingMovies, newMovieRef]
                    }
                }
            })
        }
    });

    const addMovie = (name: string, releaseDate: Dayjs, duration: number, actors: string[]) => {
        return mutation({
            variables: {
                input: {
                    name,
                    releaseDate: utils.formatDate(releaseDate),
                    duration,
                    actors
                }
            },
        });
    }
    return [addMovie, mutationResults]
};
