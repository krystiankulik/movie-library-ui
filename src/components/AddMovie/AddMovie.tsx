import React, {useState} from "react";
import styles from './AddMovie.module.sass'
import {Button} from "@material-ui/core";
import {useAddMovieMutation} from "../../hooks/mutations/useAddMovieMutation";
import {useHistory} from "react-router-dom";
import {DurationInput} from "../Input/DurationInput/DurationInput";
import {ActorsInput} from "../Input/ActorsInput/ActorsInput";
import {ReleaseDateInput} from "../Input/ReleaseDateInput";
import {MovieNameInput} from "../Input/MovieNameInput";

const DEFAULT_DATE = '1997-07-30';

export const AddMovie = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState<string>(DEFAULT_DATE);
    const [duration, setDuration] = useState<number>(90);
    const [actors, setActors] = useState<string[]>([]);
    const [addMovie] = useAddMovieMutation();
    const history = useHistory();


    const addNewMovie = () => {
        addMovie(name, date, duration, actors).then(() => {
            history.push("/");
        });
    }

    return (
        <div className={styles.addMovieContainer}>
            <div className={styles.formContainer}>
                <h1>Add new movie</h1>
                <div className={styles.formItem}>
                    <MovieNameInput name={name} setName={setName}/>
                </div>
                <div className={styles.formItem}>
                    <ReleaseDateInput date={date} setDate={setDate}/>
                </div>
                <div className={styles.formItem}>
                    <div>
                        <DurationInput duration={duration} setDuration={setDuration}/>
                    </div>
                </div>
                <div className={styles.formItem}>
                    <ActorsInput actors={actors} setActors={setActors}/>
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
