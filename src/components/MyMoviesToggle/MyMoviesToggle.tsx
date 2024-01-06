import {FormControlLabel, Switch, withStyles} from "@material-ui/core";
import React, {Dispatch, SetStateAction} from "react";
import styles from "./MyMoviesToggle.module.sass";

const StyledSwitch = withStyles({
    switchBase: {
        color: "#7dc7cb",
        '&$checked': {
            color: "#7dc7cb",
        },
        '&$checked + $track': {
            backgroundColor: "#7dc7cb",
        },
    },
    checked: {},
    track: {},
})(Switch);

type Props = {
    showMyMovies: boolean;
    setShowMyMovies: Dispatch<SetStateAction<boolean>>;
}

export const MyMoviesToggle = (props: Props) => (
    <div className={styles.toggleContainer}>
        <FormControlLabel
            control={<StyledSwitch checked={props.showMyMovies}
                                   onChange={(event) => props.setShowMyMovies(!props.showMyMovies)}
                                   name="showMyMoviesToggle"
                                   color="primary"/>}
            label={<b>{"Show only my movies"}</b>}
        />
    </div>
);
