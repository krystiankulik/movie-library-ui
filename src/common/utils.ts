import {MovieInfo} from "../apiSchema";
import {DisplayRow} from "./types";
import dayjs, {Dayjs} from "dayjs";
import {ChangeEvent, Dispatch, SetStateAction} from "react";
import {MAX_CHARACTERS} from "./constants";


const addLeadingZero = (n: number) => String(n).length <= 1 ? "0" + String(n) : String(n);

const getDurationString = (minutes: number) => `${Math.floor(minutes / 60)}:${addLeadingZero(minutes % 60)}`;

const formatDate = (date: Dayjs) => date.format('YYYY-MM-DD');

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
    formatDate,
    handleBasicTextField
}
