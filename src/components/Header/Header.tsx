import React from "react";
import {AppBar, Button, createStyles, makeStyles, Theme, Toolbar, Typography} from "@material-ui/core";
import {useCurrentUserQuery} from "../../hooks/useCurrentUserQuery";
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

const Header = () => {
    const classes = useStyles();
    const currentUser = useCurrentUserQuery();
    const logout = useLogout();
    const history = useHistory();

    const goToHomeView = () => history.push("/");
    const goToSignInView = () => history.push("/sign-in");
    const goToRegisterView = () => history.push("/register");
    const goToAddMovieView = () => history.push("/add-movie")

    const renderUserName = () => currentUser.data ? (
        <div className={styles.currentUsername}>
            <Typography variant="h6">
                {currentUser.data.currentUser.username}
            </Typography>
        </div>
    ) : null

    const renderSignInButton = () => currentUser.data ? null :
        (<Button color="inherit" onClick={goToSignInView}>
            Sing In
        </Button>);

    const renderRegisterButton = () => currentUser.data ? null :
        (<Button color="inherit" onClick={goToRegisterView}>
            Register
        </Button>);

    const logoutAndReturn = () => {
        logout();
        history.push("/");
    }

    const renderLogoutButton = () => currentUser.data ? (
        <Button color="inherit" onClick={logoutAndReturn}>
            Log out
        </Button>) : null;

    const renderAddMovieButton = () => currentUser.data ? (
        <Button color="inherit" onClick={goToAddMovieView}>
            Add movie
        </Button>
    ) : null;

    return (
        <AppBar position="static" className={classes.header}>
            <Toolbar>
                <div className={styles.homeButton}>
                    <HomeIcon onClick={goToHomeView}/>
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
