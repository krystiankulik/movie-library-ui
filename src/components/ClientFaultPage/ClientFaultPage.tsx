import React from "react";
import styles from "./ClientFaultPage.module.sass";

type Props = {
    text: string;
}
const ClientFaultPage = (props: Props) => (
    <div className={styles.container}>
        <h1>{props.text}</h1>
    </div>
);
export default ClientFaultPage;
