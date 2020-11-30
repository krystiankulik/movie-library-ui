import {gql, QueryResult, useQuery} from "@apollo/client";
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
        }
    }
`;

export interface GetAllMoviesResponse {
    getAllMovies: MovieInfo[];
}


export const useGetAllMoviesQuery = (): QueryResult<GetAllMoviesResponse> => {
    return useQuery<GetAllMoviesResponse>(GET_ALL_ITEMS);
}
