import React, {ChangeEvent, Dispatch, SetStateAction} from "react";
import {TextField} from "@material-ui/core";

type Props = {
    date: string;
    setDate: Dispatch<SetStateAction<string>>;
}

export const ReleaseDateInput = (props: Props) => {

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setDate(event.target.value);
    };

    return (
        <TextField
            id="date"
            label="Release Date"
            type="date"
            value={props.date}
            onChange={handleDateChange}
            InputLabelProps={{
                shrink: true,
            }}
        />
    );
};
