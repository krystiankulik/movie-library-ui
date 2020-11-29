import * as React from "react";
import {ChangeEvent} from "react";
import styles from './SignIn.module.sass'
import {Button, TextField} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import {useSignInMutation} from "../../hooks/useSignInMutation";


const SignIn = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();

    const [signInMutation] = useSignInMutation();

    const handleUsernameChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const submitSignIn = () => signInMutation(username, password).then(() => history.push("/"));

    return (
        <div className={styles.signInContainer}>
            <div className={styles.registerHint}>Don't have account yet? <Link to="/register">Register</Link>.</div>
            <div className={styles.formContainer}>
                <h1>Sign in</h1>
                <div className={styles.formItem}>
                    <TextField id="username" label="Username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div className={styles.formItem}>
                    <TextField id="password" label="Password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div className={styles.formItem}>
                    <Button variant="outlined" color="primary" onClick={submitSignIn}>
                        Sign In
                    </Button>
                </div>
            </div>
        </div>);
};

export default SignIn;
