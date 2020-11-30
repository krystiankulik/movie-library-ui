import {FetchResult, gql, MutationResult, useMutation} from "@apollo/client";
import {MovieInfo} from "../../apiSchema";

export const rateMovieMutationGQL = gql`
    mutation addMovie($movieId: String! $note: Int!, $comment: String) {
        rateMovie(movieId: $movieId, note: $note, comment: $comment) {
            id,
            ratings {
                username,
                note,
                comment
            }
        }
    }
`;

interface RateInput {
    movieId: string;
    note: number;
    comment: string;
}

export const useRateMovieMutation = ():  [(movieId: string, note: number, comment: string)
    => Promise<FetchResult>, MutationResult] => {
    const [mutation, mutationResults] = useMutation<{ rateMovie: MovieInfo }, RateInput>(rateMovieMutationGQL);

    const rateMovie = (movieId: string, note: number, comment: string) => {
        return mutation({
            variables: {
                movieId,
                note,
                comment
            }
        })
    }
    return [rateMovie, mutationResults];
}
