import * as React from "react";
import {ChangeEvent} from "react";
import styles from './Register.module.sass'
import {Button, TextField} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import {useRegisterMutation} from "../../hooks/useRegisterMutation";
import {useSignInMutation} from "../../hooks/useSignInMutation";


const Register = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const [register] = useRegisterMutation();
    const [signInMutation] = useSignInMutation();
    const history = useHistory();

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handlePasswordConfirmChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirm(event.target.value);
    };

    const submitRegister = () => register(username, password)
        .then(() => {
                signInMutation(username, password)
                    .then(() => history.push("/"));
            }
        )

    return (
        <div className={styles.registerContainer}>
            <div className={styles.formContainer}>
                <h1>Register</h1>
                <div className={styles.formItem}>
                    <TextField id="username" label="Username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div className={styles.formItem}>
                    <TextField id="password" label="Password" type="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div className={styles.formItem}>
                    <TextField id="passwordConfirm" label="Password Confirm" type="password" value={passwordConfirm}
                               onChange={handlePasswordConfirmChange}/>
                </div>
                <div className={styles.formItem}>
                    <Button variant="outlined" color="primary" onClick={submitRegister}>
                        Register
                    </Button>
                </div>
            </div>
        </div>);
};

export default Register;
