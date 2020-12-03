import {gql, useQuery} from "@apollo/client";
import {MovieInfo} from "../../apiSchema";

export const GET_ALL_ITEMS = gql`
    query GetAllMovies {
        getAllMovies {
            id,
            name,
            releaseDate,
            duration,
            actors,
            averageNote,
            username
            ratings {
                username,
                note,
                comment
            },
        }
    }
`;

export interface GetAllMoviesResponse {
    getAllMovies: MovieInfo[];
}

const MOVIE_SUBSCRIPTION = gql`
    subscription onMovieAffected {
        movieAffected {
            movieAdded {
                id,
                name,
                releaseDate,
                duration,
                actors,
                averageNote,
                username,
                ratings {
                    username,
                    note,
                    comment
                }
            }
            movieEdited {
                id,
                name,
                releaseDate,
                duration,
                actors,
                averageNote,
                username,
                ratings {
                    username,
                    note,
                    comment
                }
            },
            movieDeleted
        }
    }
`;

interface SubscriptionResponse {
    movieAffected: {
        movieAdded?: MovieInfo;
        movieEdited?: MovieInfo;
        movieDeleted?: string;
    }
}

const handleMovieEdited = (movieEdited: MovieInfo, prevMovies: MovieInfo[]) => {
    return prevMovies.map(movie => {
        if (movie.id === movieEdited?.id) {
            return {...movieEdited};
        }
        return movie;
    })
}

const handleMovieAdded = (movieAdded: MovieInfo, prevMovies: MovieInfo[]) => [...prevMovies, {...movieAdded}]


const handleMovieDeleted = (movieDeleted: string, prevMovies: MovieInfo[]): MovieInfo[] =>
    prevMovies.filter(movie => movie.id !== movieDeleted);


const handleSubscriptionPayload = (payload: SubscriptionResponse, prevMovies: MovieInfo[]): MovieInfo[] => {
    if (payload.movieAffected.movieEdited) {
        return handleMovieEdited(payload.movieAffected.movieEdited, prevMovies);
    } else if (payload.movieAffected.movieAdded) {
        return handleMovieAdded(payload.movieAffected.movieAdded, prevMovies);
    } else if (payload.movieAffected.movieDeleted) {
        return handleMovieDeleted(payload.movieAffected.movieDeleted, prevMovies)
    }
    return prevMovies;
}

export const useGetAllMoviesQuery = (): [GetAllMoviesResponse | undefined, any] => {
    const {data, subscribeToMore} = useQuery<GetAllMoviesResponse>(GET_ALL_ITEMS);
    const subscribeToNewRatings = () =>
        subscribeToMore({
            document: MOVIE_SUBSCRIPTION,
            updateQuery: (prev, sub: { subscriptionData: { data: SubscriptionResponse } }) => {
                if (!sub.subscriptionData.data) return prev;
                return {
                    getAllMovies: handleSubscriptionPayload(sub.subscriptionData.data, prev.getAllMovies)
                };
            }
        });

    return [data, subscribeToNewRatings]
}
