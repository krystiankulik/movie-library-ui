import React from "react";
import {ChangeEvent} from "react";
import styles from './AddMovie.module.sass'
import {Button, Chip, Fab, InputLabel, TextField, Tooltip} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {useAddMovieMutation} from "../../hooks/useAddMovieMutation";
import {useHistory} from "react-router-dom";

const MINUTES_IN_HOUR = 60;

const AddMovie = () => {
    const [name, setName] = React.useState('');
    const [date, setDate] = React.useState<string>('1997-07-30');
    const [durationHours, setDurationHours] = React.useState<number>(1);
    const [durationMinutes, setDurationMinutes] = React.useState<number>(30);
    const [newActor, setNewActor] = React.useState<string>('');
    const [actors, setActors] = React.useState<string[]>([]);

    const [addMovie] = useAddMovieMutation();
    const history = useHistory();

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const getDurationValue = (): number => durationHours * MINUTES_IN_HOUR + durationMinutes;

    const handleDurationHoursChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        if (value >= 0) {
            setDurationHours(value);
        }
    };

    const handleDurationMinutesChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value)
        if (value >= MINUTES_IN_HOUR) {
            setDurationHours(hours => hours + Math.floor(value / MINUTES_IN_HOUR));
            setDurationMinutes(value % MINUTES_IN_HOUR);
        } else if (value >= 0) {
            setDurationMinutes(value);
        }
    };

    const handleAddingNewActor = (event: ChangeEvent<HTMLInputElement>) => {
        setNewActor(event.target.value);
    };

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const addNewMovie = () => {
        addMovie(name, date, getDurationValue(), actors).then(() => {
            history.push("/");
        });
    }

    const renderActors = () => actors.map(actor =>
        <Chip
            label={actor}
            onDelete={() => deleteActor(actor)}
        />
    );


    const deleteActor = (actorToDelete: string) => {
        setActors(actors => actors.filter(actor => actor !== actorToDelete));
    }

    const addNewActor = () => {
        setActors(actors => actors.concat(newActor));
        setNewActor('');
    }

    return (
        <div className={styles.addMovieContainer}>
            <div className={styles.formContainer}>
                <h1>Add new movie</h1>
                <div className={styles.formItem}>
                    <TextField id="name" label="Name" value={name} onChange={handleNameChange}/>
                </div>
                <div className={styles.formItem}>
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
                </div>
                <div className={styles.formItem}>
                    <div>
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
                    </div>
                </div>
                <div className={styles.formItem}>
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
