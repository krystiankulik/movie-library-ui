import * as React from "react";
import {useState} from "react";
import styles from './UserManagement.module.sass'
import {Button, TextField} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {useRegisterMutation} from "../../hooks/mutations/useRegisterMutation";
import {useSignInMutation} from "../../hooks/mutations/useSignInMutation";
import {ErrorMessage} from "../ErrorMessage/ErrorMessage";
import {utils} from "../../common/utils";

const Register = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const [register] = useRegisterMutation();
    const [signInMutation] = useSignInMutation();
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const history = useHistory();

    const submitRegister = () => {
        const errors = [];
        if (username.length < 3) {
            errors.push("Username should be at least 3 characters long.");
        }

        if (password.length < 3) {
            errors.push("Password should be at least 3 characters long.");
        }

        if (password !== passwordConfirm) {
            errors.push("Passwords are not equal");
        }
        if (errors.length > 0) {
            setErrorMessages(errors);
        } else {
            register(username, password)
                .then(() => {
                    signInMutation(username, password)
                        .then(() => history.push("/"))
                        .catch((error) => setErrorMessages([error.message]));
                })
                .catch((error) => setErrorMessages([error.message]));
        }
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.formContainer}>
                <h1>Register</h1>
                <ErrorMessage errorMessages={errorMessages}/>
                <div className={styles.formItem}>
                    <TextField id="username" label="Username" value={username}
                               onChange={utils.handleBasicTextField(setUsername)}/>
                </div>
                <div className={styles.formItem}>
                    <TextField id="password" label="Password" type="password"
                               value={password}
                               onChange={utils.handleBasicTextField(setPassword)}/>
                </div>
                <div className={styles.formItem}>
                    <TextField id="passwordConfirm" label="Password Confirm" type="password"
                               value={passwordConfirm}
                               onChange={utils.handleBasicTextField(setPasswordConfirm)}/>
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
