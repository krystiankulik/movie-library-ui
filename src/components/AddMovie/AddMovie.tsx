import React, {useState} from "react";
import {ChangeEvent} from "react";
import styles from './AddMovie.module.sass'
import {Button, Chip, duration, Fab, InputLabel, TextField, Tooltip} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {useAddMovieMutation} from "../../hooks/useAddMovieMutation";
import {useHistory} from "react-router-dom";
import {DurationInput} from "../DurationInput/DurationInput";


const AddMovie = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState<string>('1997-07-30');
    const [duration, setDuration] = useState<number>(90);
    const [newActor, setNewActor] = useState<string>('');
    const [actors, setActors] = useState<string[]>([]);
    const [addMovie] = useAddMovieMutation();
    const history = useHistory();

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleAddingNewActor = (event: ChangeEvent<HTMLInputElement>) => {
        setNewActor(event.target.value);
    };

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const addNewMovie = () => {
        addMovie(name, date, duration, actors).then(() => {
            history.push("/");
        });
    }

    const renderActors = () => actors.map(actor =>
        <Chip
            label={actor}
            onDelete={() => deleteActor(actor)}
        />
    );

    const renderActorsInput = () => (
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


    const deleteActor = (actorToDelete: string) => {
        setActors(actors => actors.filter(actor => actor !== actorToDelete));
    }

    const addNewActor = () => {
        setActors(actors => actors.concat(newActor));
        setNewActor('');
    }

    const renderNameInput = () =>
        <TextField id="name" label="Name" value={name} onChange={handleNameChange}/>

    const renderDateInput = () => (
        <TextField
            id="date"
            label="Release Date"
            type="date"
            value={date}
            onChange={handleDateChange}
            InputLabelProps={{
                shrink: true,
            }}
        />
    );

    return (
        <div className={styles.addMovieContainer}>
            <div className={styles.formContainer}>
                <h1>Add new movie</h1>
                <div className={styles.formItem}>
                    {renderNameInput()}
                </div>
                <div className={styles.formItem}>
                    {renderDateInput()}
                </div>
                <div className={styles.formItem}>
                    <div>
                        <DurationInput duration={duration} setDuration={setDuration}/>
                    </div>
                </div>
                <div className={styles.formItem}>
                    {renderActorsInput}
                </div>
                <div className={styles.formItem}>
                    <Button variant="outlined" color="primary" onClick={addNewMovie}>
                        Add New Movie
                    </Button>
                </div>
            </div>
        </div>);
};

export default AddMovie;
