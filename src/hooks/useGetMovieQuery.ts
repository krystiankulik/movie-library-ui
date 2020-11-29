import {gql, QueryResult, useQuery} from "@apollo/client";
import {MovieInfo} from "../apiSchema";

const GET_ITEMS = gql`
    query GetMovie($movieId: String!) {
        getMovie(movieId: $movieId) {
            id,
            name,
            releaseDate,
            duration,
            actors,
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


export const useGetMovieQuery = (movieId: string): [boolean, GetMovieResponse | undefined, () => void] => {
    const {loading, data, error, subscribeToMore} = useQuery(GET_ITEMS, {
        variables: {
            movieId: movieId
        }
    });

    const subscribeToNewRatings = () =>
        subscribeToMore({
            document: RATINGS_SUBSCRIPTION,
            variables: {movieId: movieId},
            updateQuery: (prev, {subscriptionData}) => {
                console.log(JSON.stringify(subscriptionData))
                console.log(JSON.stringify(prev))
                if (!subscriptionData.data) return prev;
                const newRatingItem = subscriptionData.data.ratingAdded;
                const result =  {
                    getMovie: {
                        ...prev.getMovie, ratings: [...(prev?.getMovie?.ratings || []), {
                            username: newRatingItem.username,
                            note: newRatingItem.note,
                            comment: newRatingItem.comment
                        }]
                    }
                }

                console.log(result)
                return result;
            }
        })

    return [loading, data, subscribeToNewRatings];
}
