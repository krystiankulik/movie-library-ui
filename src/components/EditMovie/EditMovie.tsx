import React, {useEffect, useState} from "react";
import styles from './EditMovie.module.sass'
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {DurationInput} from "../Input/DurationInput/DurationInput";
import {ActorsInput} from "../Input/ActorsInput/ActorsInput";
import {ReleaseDateInput} from "../Input/ReleaseDateInput";
import {MovieNameInput} from "../Input/MovieNameInput";
import {useEditMovieMutation} from "../../hooks/mutations/useEditMovieMutation";
import {useGetMovieQuery} from "../../hooks/queries/useGetMovieQuery";


type Props = {
    selectedMovieId: string;
}

const DEFAULT_DATE = '1997-07-30';

export const EditMovie = (props: Props) => {
    const [, data] = useGetMovieQuery(props.selectedMovieId);

    const [name, setName] = useState<string>('');
    const [date, setDate] = useState<string>(DEFAULT_DATE);
    const [duration, setDuration] = useState<number>(0);
    const [actors, setActors] = useState<string[]>([]);
    const [editMovie] = useEditMovieMutation();
    const history = useHistory();
    const [updated, setUpdated] = useState<boolean>(false);


    useEffect(() => {
        const movie = data?.getMovie;
        if (movie && !updated) {
            setName(movie.name);
            setDuration(movie.duration);
            setDate(new Date(movie.releaseDate).toLocaleDateString("en-US"));
            setActors(movie.actors);
        }
    }, [data]);


    const handleMovieEdit = () => {
        editMovie(String(data?.getMovie?.id), name, date, duration, actors).then(() => {
            setUpdated(true);
            history.push("/movies/" + data?.getMovie?.id);
        });
    }


    return (
        <div className={styles.editMovieContainer}>
            <div className={styles.formContainer}>
                <h1>Edit movie</h1>
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
                    <Button variant="outlined" color="primary" onClick={handleMovieEdit}>
                        Edit Movie
                    </Button>
                </div>
            </div>
        </div>);
};
