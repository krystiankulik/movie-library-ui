import React, {useState} from "react";
import styles from "./MovieDisplay.module.sass";
import {utils} from "../../common/utils";
import {RatingStarsView} from "../RatingStars/RatingStarsView";
import {MovieInfo, RatingInfo} from "../../apiSchema";
import {Button, TextField} from "@material-ui/core";
import {Rating} from "@material-ui/lab";
import {useRateMovieMutation} from "../../hooks/mutations/useRateMovieMutation";
import {useHistory} from "react-router-dom";
import {useDeleteMovieMutation} from "../../hooks/mutations/useDeleteMovieMutation";
import dayjs from "dayjs";

type Props = {
    selectedMovie: MovieInfo;
    loggedUser?: string;
}
const MovieDisplay = (props: Props) => {
    const [comment, setComment] = useState<string>('')
    const [note, setNote] = useState<number | null>(2);
    const [rateMovie] = useRateMovieMutation();
    const [deleteMovie] = useDeleteMovieMutation();
    const history = useHistory();

    const movieDisplayable = utils.mapMovieToDisplayRow(props.selectedMovie);

    const renderRating = (ratingInfo: RatingInfo) =>
        <div key={ratingInfo.username}>
            <div>
                <h6>{ratingInfo.username}</h6>
            </div>
            <div>
                <RatingStarsView value={ratingInfo.note}/>
            </div>
            <div>{ratingInfo.comment}</div>
        </div>

    const rateMovieSubmit = () => {
        rateMovie(movieDisplayable?.id ?? '', Number(note), comment)
            .catch(error => console.error(error.message));
    }

    const editMovie = () => {
        history.push("/edit-movie/" + movieDisplayable?.id)
    }

    const handleMovieDelete = () => {
        deleteMovie(movieDisplayable?.id ?? '')
            .catch(error => console.error(error.message));
        history.push("/");
    }


    const renderRateInput = () => {
        const movieAlreadyRated = props.selectedMovie.ratings
            .filter(rating => rating.username === props.loggedUser).length > 0

        if (movieAlreadyRated || !props.loggedUser) {
            return null;
        }

        return (
            <div className={styles.rateInput}>
                <h5>Add your rating:</h5>
                <div className={styles.inputFormItem}>
                    <Rating
                        name="userNote"
                        value={note}
                        precision={1}
                        onChange={(event, newValue) => {
                            setNote(newValue);
                        }}
                    />
                </div>
                <div className={styles.inputFormItem}>
                    <TextField
                        id="comment-input"
                        label="Comment"
                        multiline
                        rowsMax={4}
                        value={comment}
                        onChange={event => setComment(event.target.value)}
                    />
                </div>
                <div>
                    <Button variant="outlined" color="primary" size="medium" onClick={rateMovieSubmit}>
                        Rate
                    </Button>
                </div>
            </div>
        );
    }

    const renderEditButton = () => (
        props.loggedUser === props.selectedMovie.username ? (
            <div className={styles.actionButton}>
                <Button variant="outlined" color="default" size="small" onClick={editMovie}>
                    Edit
                </Button>
            </div>) : null
    );
    const renderDeleteButton = () =>
        props.loggedUser === props.selectedMovie.username ? (
            <div className={styles.actionButton}>
                <Button variant="outlined" color="secondary" size="small" onClick={handleMovieDelete}>
                    Delete
                </Button>
            </div>) : null;


    return (
        <div className={styles.mainContainer}>
            <h2>Movie Details</h2>
            <div className={styles.detailsContainer}>
                <div className={styles.detailsInfoContainer}>
                    <div><b>Name</b></div>
                    <div>{movieDisplayable?.name}</div>
                    <div><b>Release Date</b></div>
                    <div>{movieDisplayable?.releaseDate ? utils.formatDate(dayjs(movieDisplayable?.releaseDate)) : ''}</div>
                    <div><b>Duration</b></div>
                    <div>{movieDisplayable?.duration}</div>
                    <div><b>Actors</b></div>
                    <div>{movieDisplayable?.actors.join(", ")}</div>
                    <div><b>Created by</b></div>
                    <div>{movieDisplayable?.username}</div>
                    <div className={styles.noWrap}><b>Average Note</b></div>
                    <div>
                        <RatingStarsView value={movieDisplayable?.averageNote ?? 0}/>
                    </div>
                </div>
                <div className={styles.actionButtons}>
                    {renderEditButton()}
                    {renderDeleteButton()}
                </div>
            </div>
            <h3>Comments</h3>
            {renderRateInput()}
            <div className={styles.comments}>
                {props.selectedMovie.ratings.map(rating => renderRating(rating))}
            </div>
        </div>
    );
}
export default MovieDisplay;
