import {Dayjs} from "dayjs";

export interface DisplayRow {
    id: string;
    name: string;
    releaseDate: Dayjs;
    duration: string;
    actors: string[];
    username: string;
    averageNote: number;
}
