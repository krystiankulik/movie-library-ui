import {gql, useQuery} from "@apollo/client";
import {MovieInfo} from "../../apiSchema";

const GET_ITEM = gql`
    query GetMovie($movieId: String!) {
        getMovie(movieId: $movieId) {
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
            }
        }
    }
`;

const RATINGS_SUBSCRIPTION = gql`
    subscription OnRatingAdded($movieId: String!) {
        ratingAdded(movieId: $movieId){
            comment,
            username,
            note
        }
    }
`;

export interface GetMovieResponse {
    getMovie?: MovieInfo;
}


export const useGetMovieQuery = (movieId: string): [boolean, GetMovieResponse | undefined, any] => {
    const {loading, data, subscribeToMore} = useQuery(GET_ITEM, {
        variables: {
            movieId: movieId
        }
    });

    const subscribeToNewRatings = () =>
        subscribeToMore({
            document: RATINGS_SUBSCRIPTION,
            variables: {movieId: movieId},
            updateQuery: (prev, {subscriptionData}) => {
                if (!subscriptionData.data) return prev;
                const newRatingItem = subscriptionData.data.ratingAdded;
                return {
                    getMovie: {
                        ...prev.getMovie,
                        averageNote: newRatingItem.averageNote,
                        ratings: [...(prev?.getMovie?.ratings || []), {...newRatingItem}]
                    }
                };
            }
        });

    return [loading, data, subscribeToNewRatings];
}
