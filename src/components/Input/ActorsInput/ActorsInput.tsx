import {Chip, Fab, InputLabel, TextField, Tooltip} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import styles from "./ActorsInput.module.sass";

type Props = {
    actors: string[];
    setActors: Dispatch<SetStateAction<string[]>>;
}

export const ActorsInput = (props: Props) => {
    const [newActor, setNewActor] = useState<string>('');

    const deleteActor = (actorToDelete: string) => {
        props.setActors(actors => actors.filter(actor => actor !== actorToDelete));
    }

    const handleAddingNewActor = (event: ChangeEvent<HTMLInputElement>) => {
        setNewActor(event.target.value);
    };

    const addNewActor = () => {
        props.setActors(actors => actors.concat(newActor));
        setNewActor('');
    }

    const renderActors = () => props.actors.map(actor =>
        <Chip
            label={actor}
            onDelete={() => deleteActor(actor)}
        />
    );

    return (
        <>
            <div>
                <InputLabel>Actors</InputLabel>
            </div>
            <div>
                <TextField
                    id="newActor"
                    value={newActor}
                    onChange={handleAddingNewActor}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <div className={styles.addTooltip}>
                    <Tooltip title="Add" aria-label="add" onClick={addNewActor}>
                        <Fab color="default">
                            <AddIcon/>
                        </Fab>
                    </Tooltip>
                </div>
            </div>
            {renderActors()}
        </>
    );
};
