import React, {ChangeEvent, Dispatch, SetStateAction} from "react";
import {TextField} from "@material-ui/core";

type Props = {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
}

export const MovieNameInput = (props: Props) => {
    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setName(event.target.value);
    };
    return (
        <TextField id="name" label="Name" value={props.name} onChange={handleNameChange}/>
    );
}
