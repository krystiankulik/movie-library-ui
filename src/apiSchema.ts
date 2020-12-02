
export interface UserInfo {
    id: string;
    username: string;
}


export interface RatingInfo {
    username: string;
    note: number;
    comment: string;
}

export interface MovieInfo {
    id: string;
    name: string;
    releaseDate: string;
    duration: number;
    actors: string[];
    username: string;
    averageNote: number;
    ratings: RatingInfo[];
}
