import styles from "../AddMovie/AddMovie.module.sass";
import {InputLabel, TextField} from "@material-ui/core";
import React, {ChangeEvent, Dispatch, useState} from "react";

const MINUTES_IN_HOUR = 60;

type Props = {
    duration: number; // time in minutes
    setDuration: Dispatch<number>;
}

const getHours = (value: number) => Math.floor(value / MINUTES_IN_HOUR)
const getMinutes = (value: number) => value % MINUTES_IN_HOUR


export const DurationInput = (props: Props) => {

    const [durationHours, setDurationHours] = useState<number>(getHours(props.duration));
    const [durationMinutes, setDurationMinutes] = useState<number>(getMinutes(30));

    const getDurationValue = (): number => durationHours * MINUTES_IN_HOUR + durationMinutes;

    const handleDurationHoursChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        if (value >= 0) {
            setDurationHours(value);
            props.setDuration(getDurationValue())
        }
    };

    const handleDurationMinutesChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value)
        if (value >= MINUTES_IN_HOUR) {
            setDurationHours(hours => hours + getHours(value));
            setDurationMinutes(getMinutes(props.duration));
            props.setDuration(getDurationValue())
        } else if (value >= 0) {
            setDurationMinutes(value);
            props.setDuration(getDurationValue())
        }
    };

    return (
        <>
            <div>
                <InputLabel>Duration</InputLabel>
            </div>
            <div className={styles.durationInput}>
                <TextField
                    id="filled-number"
                    label="Hours"
                    type="number"
                    value={durationHours}
                    onChange={handleDurationHoursChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                />
                <TextField
                    id="filled-number"
                    label="Minutes"
                    type="number"
                    value={durationMinutes}
                    onChange={handleDurationMinutesChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                />
            </div>
        </>
    );
}
