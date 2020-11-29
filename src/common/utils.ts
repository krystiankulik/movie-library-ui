import {MovieInfo} from "../apiSchema";
import {DisplayRow} from "./types";


const addLeadingZero = (n: number) => String(n).length <= 1 ? "0" + String(n) : String(n);
const getDurationString = (minutes: number) => `${Math.floor(minutes / 60)}:${addLeadingZero(minutes % 60)}`;

const mapMovieToDisplayRow = (movie: MovieInfo): DisplayRow => ({
    id: movie.id,
    name: movie.name,
    releaseDate: new Date(movie.releaseDate),
    duration: getDurationString(movie.duration),
    actors: movie.actors.join(", "),
    averageNote: movie.averageNote,
});

export const utils = {
    addLeadingZero,
    getDurationString,
    mapMovieToDisplayRow
}
