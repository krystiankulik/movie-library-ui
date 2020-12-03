import {Chip, Fab, InputLabel, TextField, Tooltip} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, {ChangeEvent, Dispatch, memo, SetStateAction, useState} from "react";
import styles from "./ActorsInput.module.sass";

type Props = {
    actors: string[];
    setActors: Dispatch<SetStateAction<string[]>>;
}

export const ActorsInput = memo((props: Props) => {
    const [newActor, setNewActor] = useState<string>('');

    const deleteActor = (actorToDelete: string) => {
        props.setActors(actors => actors.filter(actor => actor !== actorToDelete));
    }

    const handleAddingNewActor = (event: ChangeEvent<HTMLInputElement>) => {
        setNewActor(event.target.value);
    };

    const addNewActor = () => {
        if (newActor.length > 0) {
            if (!props.actors.includes(newActor)) {
                props.setActors(actors => actors.concat(newActor));
            }
            setNewActor('');
        }
    }

    const renderActors = () => props.actors.map(actor =>
        <div className={styles.chipWrapper} key={actor}>
            <Chip
                label={actor}
                onDelete={() => deleteActor(actor)}
            />
        </div>
    );

    return (
        <>
            <div>
                <InputLabel>Actors</InputLabel>
            </div>
            <div className={styles.chipContainer}>
                {renderActors()}
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
                    {/*Using the tooltip can cause findDOMNode deprecation error in the console.
                     I would just wait for material-ui to make their components compatible with the newest React version.*/}
                    <Tooltip title="Add" aria-label="add" onClick={addNewActor}>
                        <Fab color="default">
                            <AddIcon/>
                        </Fab>
                    </Tooltip>
                </div>
            </div>
        </>
    );
});
