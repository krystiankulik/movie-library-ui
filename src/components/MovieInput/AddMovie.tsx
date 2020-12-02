import React, {useCallback, useState} from "react";
import styles from './MovieInput.module.sass'
import {Button} from "@material-ui/core";
import {useAddMovieMutation} from "../../hooks/mutations/useAddMovieMutation";
import {useHistory} from "react-router-dom";
import {DurationInput} from "../Input/DurationInput/DurationInput";
import {ActorsInput} from "../Input/ActorsInput/ActorsInput";
import {ReleaseDateInput} from "../Input/ReleaseDateInput";
import {MovieNameInput} from "../Input/MovieNameInput";
import dayjs, {Dayjs} from "dayjs";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";

export const AddMovie = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState<Dayjs>(dayjs());
    const [duration, setDuration] = useState<number>(90);
    const [actors, setActors] = useState<string[]>([]);
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [addMovie] = useAddMovieMutation();
    const history = useHistory();

    const handleActors = useCallback((actors) => setActors(actors), []);
    const handleDuration = useCallback((duration) => setDuration(duration), []);

    const addNewMovie = () => {
        const errors = [];
        if (name.length === 0) {
            errors.push("Movie name should not be empty.");
        }
        if (duration <= 0) {
            errors.push("Movie duration should be positive.");
        }
        if(!date.isValid()) {
            errors.push("Movie release date is not correct.");
        }
        if (errors.length > 0) {
            setErrorMessages(errors);
        } else {
            addMovie(name, date, duration, actors).then(() => {
                history.push("/");
            }).catch((error) => setErrorMessages([error.message]));
        }
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.formContainer}>
                <h1>Add new movie</h1>
                <ErrorMessage errorMessages={errorMessages}/>
                <div className={styles.formItem}>
                    <MovieNameInput name={name} setName={setName}/>
                </div>
                <div className={styles.formItem}>
                    <ReleaseDateInput date={date} setDate={setDate}/>
                </div>
                <div className={styles.formItem}>
                    <div>
                        <DurationInput duration={duration} setDuration={handleDuration}/>
                    </div>
                </div>
                <div className={styles.formItem}>
                    <ActorsInput actors={actors} setActors={handleActors}/>
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
