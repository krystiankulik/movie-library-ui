import {InputLabel, TextField} from "@material-ui/core";
import React, {ChangeEvent, Dispatch, useState} from "react";
import styles from "./DurationInput.module.sass";

const MINUTES_IN_HOUR = 60;

type Props = {
    duration: number; // time in minutes
    setDuration: Dispatch<number>;
}

const getHours = (value: number) => Math.floor(value / MINUTES_IN_HOUR);

const getMinutes = (value: number) => value % MINUTES_IN_HOUR;

const getDurationValue = (hours: number, minutes: number): number => hours * MINUTES_IN_HOUR + minutes;


export const DurationInput = React.memo((props: Props) => {

    const [durationHours, setDurationHours] = useState<number>(getHours(props.duration));
    const [durationMinutes, setDurationMinutes] = useState<number>(getMinutes(props.duration));


    const handleDurationHoursChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        if (value >= 0) {
            setDurationHours(value);
            props.setDuration(getDurationValue(value, durationMinutes))
        }
    };

    const handleDurationMinutesChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value)
        if (value >= MINUTES_IN_HOUR) {
            const hours = durationHours + getHours(value);
            const minutes = getMinutes(value);
            setDurationHours(hours);
            setDurationMinutes(minutes);
            props.setDuration(getDurationValue(hours, minutes))
        } else if (value >= 0) {
            setDurationMinutes(value);
            props.setDuration(getDurationValue(durationHours, value))
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
});
