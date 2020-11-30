import {Rating} from "@material-ui/lab";
import React from "react";

export const RatingStarsView = (props: { value: number }) => (
    <Rating
        name="rating-read-only"
        value={props.value}
        precision={.1}
        readOnly
    />
)
