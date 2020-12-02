import {MovieInfo} from "../apiSchema";
import {DisplayRow} from "./types";
import dayjs, {Dayjs} from "dayjs";
import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {MAX_CHARACTERS} from "./constants";


const addLeadingZero = (n: number) => String(n).length <= 1 ? "0" + String(n) : String(n);

const getDurationString = (minutes: number) => `${Math.floor(minutes / 60)}:${addLeadingZero(minutes % 60)}`;

const formatDate = (date: Dayjs) => date.format('YYYY-MM-DD');

const mapMovieToDisplayRow = (movie: MovieInfo): DisplayRow => ({
    id: movie.id,
    name: movie.name,
    releaseDate: dayjs(movie.releaseDate),
    duration: getDurationString(movie.duration),
    actors: movie.actors,
    username: movie.username,
    averageNote: movie.averageNote,
});

const handleBasicTextField = (setValue: Dispatch<SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value.length < MAX_CHARACTERS) {
            setValue(event.target.value);
        }
    };


export const utils = {
    addLeadingZero,
    getDurationString,
    mapMovieToDisplayRow,
    formatDate,
    handleBasicTextField
}
