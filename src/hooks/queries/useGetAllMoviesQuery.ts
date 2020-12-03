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
        movieDeleted?: String;
    }
}

export const useGetAllMoviesQuery = (): [GetAllMoviesResponse | undefined, any] => {
    const {data, subscribeToMore} = useQuery<GetAllMoviesResponse>(GET_ALL_ITEMS);
    console.log(data)
    const subscribeToNewRatings = () =>
        subscribeToMore({
            document: MOVIE_SUBSCRIPTION,
            updateQuery: (prev, sub: { subscriptionData: { data: SubscriptionResponse } }) => {
                if (!sub.subscriptionData.data) return prev;
                const movieAffected = sub.subscriptionData.data.movieAffected;
                let movies: MovieInfo[] = prev.getAllMovies;
                if (movieAffected.movieEdited) {
                    const movieEdited = movieAffected.movieEdited;
                    movies = prev.getAllMovies.map(movie => {
                        if (movie.id === movieEdited?.id) {
                            return movieEdited;
                        }
                        return movie;
                    })
                } else if (movieAffected.movieAdded) {
                    if(movies.filter(movie => movie.id !== movieAffected.movieAdded?.id).length === 0) {
                        movies.push(movieAffected.movieAdded);
                    }
                } else if (movieAffected.movieDeleted) {
                    console.log(movieAffected.movieDeleted)
                    movies = prev.getAllMovies.filter(movie => movie.id !== movieAffected.movieDeleted)
                }

                return {
                    getAllMovies: movies
                };
            }
        });

    return [data, subscribeToNewRatings]
}
