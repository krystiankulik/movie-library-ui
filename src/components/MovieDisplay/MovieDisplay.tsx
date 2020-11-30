import {useGetMovieQuery} from "../../hooks/queries/useGetMovieQuery";
import NotFound from "../NotFound/NotFound";
import React, {useEffect, useState} from "react";
import styles from "./MovieDisplay.module.sass";
import {utils} from "../../common/utils";
import {RatingStarsView} from "../RatingStars/RatingStarsView";
import {RatingInfo} from "../../apiSchema";
import {Button, TextField} from "@material-ui/core";
import {Rating} from "@material-ui/lab";
import {useRateMovieMutation} from "../../hooks/mutations/useRateMovieMutation";
import {useCurrentUserQuery} from "../../hooks/queries/useCurrentUserQuery";
import {useHistory} from "react-router-dom";
import {useDeleteMovieMutation} from "../../hooks/mutations/useDeleteMovieMutation";

type Props = {
    selectedMovieId: string;
}
const MovieDisplay = (props: Props) => {
    const [loading, data, subscribeToNewRatings] = useGetMovieQuery(props.selectedMovieId);
    const [comment, setComment] = useState<string>('')
    const [note, setNote] = useState<number | null>(2);
    const [rateMovie] = useRateMovieMutation();
    const [deleteMovie] = useDeleteMovieMutation();
    const currentUser = useCurrentUserQuery();
    const history = useHistory();

    useEffect(() => {
        const unsubscribe = subscribeToNewRatings();
        return () => unsubscribe();
    }, []);

    if (!data?.getMovie && !loading) {
        return <NotFound/>
    }

    const movieDisplayable = data?.getMovie ? utils.mapMovieToDisplayRow(data?.getMovie) : null;

    const renderRating = (ratingInfo: RatingInfo) =>
        <div key={ratingInfo.username}>
            <div>
                <h6>{ratingInfo.username}</h6>
            </div>
            <div>
                <RatingStarsView value={ratingInfo.note}/>
            </div>
            <div>{ratingInfo.comment}</div>
            <hr/>
        </div>

    const rateMovieSubmit = () => {
        rateMovie(movieDisplayable?.id ?? '', Number(note), comment);
    }

    const editMovie = () => {
        history.push("/edit-movie/" + movieDisplayable?.id)
    }

    const handleMovieDelete = () => {
        deleteMovie(movieDisplayable?.id ?? '');
        history.push("/");
    }


    const renderRateInput = () => {
        const movieAlreadyRated = (data?.getMovie?.ratings ?? [])
            .filter(rating => rating.username === currentUser.data?.currentUser.username).length > 0

        if (movieAlreadyRated) {
            return null;
        }

        return (
            <div>
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
                    <Button variant="outlined" color="primary" size="small" onClick={rateMovieSubmit}>
                        Rate
                    </Button>
                </div>
                <hr/>
            </div>
        );
    }

    const renderEditButton = () => (
        <div className={styles.actionButton}>
            <Button variant="outlined" color="default" size="small" onClick={editMovie}>
                Edit
            </Button>
        </div>
    );
    const renderDeleteButton = () => (
        <div className={styles.actionButton}>
            <Button variant="outlined" color="secondary" size="small" onClick={handleMovieDelete}>
                Delete
            </Button>
        </div>
    );

    return (
        <div className={styles.mainContainer}>
            <h2>Movie Details</h2>
            <div className={styles.detailsContainer}>
                <div className={styles.detailsInfoContainer}>
                    <div>Name</div>
                    <div>{movieDisplayable?.name}</div>
                    <div>Release Date</div>
                    <div>{movieDisplayable?.releaseDate.toLocaleDateString("en-US")}</div>
                    <div>Duration</div>
                    <div>{movieDisplayable?.duration}</div>
                    <div>Actors</div>
                    <div>{movieDisplayable?.actors.join(", ")}</div>
                    <div>Created by</div>
                    <div>{movieDisplayable?.username}</div>
                    <div>Average Note</div>
                    <div>
                        <RatingStarsView value={movieDisplayable?.averageNote ?? 0}/>
                    </div>
                </div>
                <div>
                    {renderEditButton()}
                    {renderDeleteButton()}
                </div>
            </div>
            <h3>Comments</h3>
            <div>
                {(data?.getMovie?.ratings || []).map(rating => renderRating(rating))}
            </div>
            {renderRateInput()}
        </div>
    );
}
export default MovieDisplay;
