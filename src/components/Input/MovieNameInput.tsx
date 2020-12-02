import React, {Dispatch, SetStateAction} from "react";
import {TextField} from "@material-ui/core";
import {utils} from "../../common/utils";

type Props = {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
}

export const MovieNameInput = (props: Props) => (
    <TextField id="name"
               label="Name"
               value={props.name}
               onChange={utils.handleBasicTextField(props.setName)}/>);

