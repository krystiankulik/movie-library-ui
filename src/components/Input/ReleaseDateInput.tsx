import React, {ChangeEvent, Dispatch, SetStateAction} from "react";
import {TextField} from "@material-ui/core";
import dayjs, {Dayjs} from "dayjs";
import {utils} from "../../common/utils";

type Props = {
    date: Dayjs;
    setDate: Dispatch<SetStateAction<Dayjs>>;
}

export const ReleaseDateInput = (props: Props) => {

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setDate(dayjs(event.target.value));
    };

    return (
        <TextField
            id="date"
            label="Release Date"
            type="date"
            value={utils.formatDate(props.date)}
            onChange={handleDateChange}
            InputLabelProps={{
                shrink: true,
            }}
        />
    );
};
