import React, {useCallback, useEffect, useState} from "react";
import styles from './MovieInput.module.sass'
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {DurationInput} from "../Input/DurationInput/DurationInput";
import {ActorsInput} from "../Input/ActorsInput/ActorsInput";
import {ReleaseDateInput} from "../Input/ReleaseDateInput";
import {MovieNameInput} from "../Input/MovieNameInput";
import {useEditMovieMutation} from "../../hooks/mutations/useEditMovieMutation";
import {useGetMovieQuery} from "../../hooks/queries/useGetMovieQuery";
import dayjs, {Dayjs} from "dayjs";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";

type Props = {
    selectedMovieId: string;
}

export const EditMovie = (props: Props) => {
    const [, data] = useGetMovieQuery(props.selectedMovieId);
    const isDataDefined = data === undefined;

    const [name, setName] = useState<string>('');
    const [date, setDate] = useState<Dayjs>(dayjs());
    const [duration, setDuration] = useState<number | undefined>();
    const [actors, setActors] = useState<string[]>([]);
    const [editMovie] = useEditMovieMutation();
    const history = useHistory();
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const handleActors = useCallback((actors) => setActors(actors), []);
    const handleDuration = useCallback((duration) => setDuration(duration), []);

    useEffect(() => {
        const movie = data?.getMovie;
        if (movie && !isDataDefined) {
            setName(movie.name);
            setDuration(movie.duration);
            setDate(dayjs(movie.releaseDate));
            setActors(movie.actors);
        }
    }, [data?.getMovie, isDataDefined]);

    const backToMovieDetails = () =>
        history.push("/movies/" + data?.getMovie?.id);

    const handleMovieEdit = () => {
        const errors = [];
        if (name.length === 0) {
            errors.push("Movie name should not be empty.");
        }
        if (!duration || duration <= 0) {
            errors.push("Movie duration should be positive.");
        }
        if (!date.isValid()) {
            errors.push("Movie release date is not correct.");
        }
        if (errors.length > 0) {
            setErrorMessages(errors);
        } else {
            editMovie(String(data?.getMovie?.id), name, date, duration ?? 0, actors)
                .then(() => {
                    backToMovieDetails();
                })
                .catch((error) => setErrorMessages([error.message]));
        }
    }


    return (
        <div className={styles.mainContainer}>
            <div className={styles.formContainer}>
                <h1>Edit movie</h1>
                <ErrorMessage errorMessages={errorMessages}/>
                <div className={styles.formItem}>
                    <MovieNameInput name={name} setName={setName}/>
                </div>
                <div className={styles.formItem}>
                    <ReleaseDateInput date={date} setDate={setDate}/>
                </div>
                <div className={styles.formItem}>
                    <div>
                        {duration && <DurationInput duration={duration} setDuration={handleDuration}/>}
                    </div>
                </div>
                <div className={styles.formItem}>
                    <ActorsInput actors={actors} setActors={handleActors}/>
                </div>
                <div>
                    <div className={styles.actionButtons}>
                        <div className={styles.actionButton}>
                            <Button variant="outlined" color="primary" onClick={handleMovieEdit}>
                                Edit Movie
                            </Button>
                        </div>
                        <div className={styles.actionButton}>
                            <Button variant="outlined" color="default" onClick={backToMovieDetails}>
                                Back to movie details
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>);

};
