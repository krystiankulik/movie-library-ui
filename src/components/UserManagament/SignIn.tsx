import * as React from "react";
import {useState} from "react";
import styles from './UserManagement.module.sass'
import {Button, TextField} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import {useSignInMutation} from "../../hooks/mutations/useSignInMutation";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";
import {utils} from "../../common/utils";

export const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const history = useHistory();
    const [signInMutation] = useSignInMutation();


    const submitSignIn = () => {
        const errors = [];
        if (username.length < 3) {
            errors.push("Username should be at least 3 characters long.");
        }
        if (password.length < 3) {
            errors.push("Password should be at least 3 characters long.");
        }

        if (errors.length > 0) {
            setErrorMessages(errors);
        } else {
            signInMutation(username, password)
                .then(() => history.push("/"))
                .catch((error) => setErrorMessages([error.message]));
        }
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.formContainer}>
                <div className={styles.registerHint}>Don't have account yet? <Link to="/register">Register</Link>.</div>
                <h1>Sign in</h1>
                <ErrorMessage errorMessages={errorMessages}/>
                <div className={styles.formItem}>
                    <TextField id="username" label="Username" value={username}
                               onChange={utils.handleBasicTextField(setUsername)}/>
                </div>
                <div className={styles.formItem}>
                    <TextField id="password"
                               label="Password"
                               type="password"
                               value={password}
                               onChange={utils.handleBasicTextField(setPassword)}/>
                </div>
                <div className={styles.formItem}>
                    <Button variant="outlined" color="primary" onClick={submitSignIn}>
                        Sign In
                    </Button>
                </div>
            </div>
        </div>);
};
