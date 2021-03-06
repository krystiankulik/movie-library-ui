import React from "react";
import {AppBar, Button, createStyles, makeStyles, Theme, Toolbar, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {useLogout} from "../../hooks/useLogOut";
import styles from "./Header.module.sass"
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        space: {
            flexGrow: 1,
        },
        header: {
            backgroundColor: "#7dc7cb",
        },
        menuButton: {
            marginRight: theme.spacing(2),
        }
    }),
);

type Props = {
    loggedUser?: string;
}

const Header = (props: Props) => {
    const classes = useStyles();
    const logout = useLogout();
    const history = useHistory();

    const goToHomeView = () => history.push("/");
    const goToSignInView = () => history.push("/sign-in");
    const goToRegisterView = () => history.push("/register");
    const goToAddMovieView = () => history.push("/add-movie")

    const renderUserName = () => props.loggedUser ? (
        <div className={styles.currentUsername}>
            <Typography variant="h6">
                {props.loggedUser}
            </Typography>
        </div>
    ) : null

    const renderSignInButton = () => props.loggedUser ? null :
        (<Button color="inherit" onClick={goToSignInView}>
            Sign In
        </Button>);

    const renderRegisterButton = () => props.loggedUser ? null :
        (<Button color="inherit" onClick={goToRegisterView}>
            Register
        </Button>);

    const logoutAndReturn = () => {
        logout().then(() => history.push("/"));
    }

    const renderLogoutButton = () => props.loggedUser ? (
        <Button color="inherit" onClick={logoutAndReturn}>
            Log out
        </Button>) : null;

    const renderAddMovieButton = () => props.loggedUser ? (
        <Button color="inherit" onClick={goToAddMovieView}>
            Add movie
        </Button>
    ) : null;

    return (
        <AppBar position="static" className={classes.header}>
            <Toolbar>
                <div className={styles.homeButton} onClick={goToHomeView}>
                    <HomeIcon/>
                </div>
                <div className={classes.space}/>
                {renderUserName()}
                {renderSignInButton()}
                {renderRegisterButton()}
                {renderAddMovieButton()}
                {renderLogoutButton()}
            </Toolbar>
        </AppBar>)

};

export default Header;
