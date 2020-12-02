import styles from "./ErrorMessage.module.sass";
import * as React from "react";

type Props = {
    errorMessages: string[];
}

export const ErrorMessage = (props: Props) => (
    <>
        {props.errorMessages.map((message, index) =>
            <div key={index} className={styles.errorMessage}>
                {message}
            </div>
        )}
    </>
);
