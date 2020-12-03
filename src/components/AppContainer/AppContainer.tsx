import React, {useEffect, useState} from 'react';
import styles from "./AppContainer.module.sass"
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {RouteComponentProps} from "react-router";
import {useGetAllMoviesQuery} from "../../hooks/queries/useGetAllMoviesQuery";
import MovieDisplay from "../MovieDisplay/MovieDisplay";
import {EditMovie} from "../MovieInput/EditMovie";
import MainDashboard from "../MainDashboard/MainDashboard";
import {SignIn} from "../UserManagament/SignIn";
import Register from "../UserManagament/Register";
import AddMovie from "../MovieInput/AddMovie";
import ClientFaultPage from "../ClientFaultPage/ClientFaultPage";
import Header from "../Header/Header";
import {useCurrentUserQuery} from "../../hooks/queries/useCurrentUserQuery";
import {useAuthToken} from "../../hooks/useAuthToken";


export const AppContainer = () => {
    const [data, subscribeToNewRatings] = useGetAllMoviesQuery();
    const user = useCurrentUserQuery();
    const [token] = useAuthToken();
    const [showMyMovies, setShowMyMovies] = useState<boolean>(false);

    const getLoggedUser = () => user.data && token ? user.data.currentUser.username : undefined;

    const findMovie = (routerProps: RouteComponentProps<any>) => data?.getAllMovies.find(movie => movie.id === routerProps.match.params.movieId);

    const renderSelectedMovie = (routerProps: RouteComponentProps<any>) => {
        const movie = findMovie(routerProps);
        return movie ? <MovieDisplay loggedUser={getLoggedUser()} selectedMovie={movie}/> :
            <ClientFaultPage text="404 Not Found"/>;
    }

    const renderMovieEdition = (routerProps: RouteComponentProps<any>) => {
        const movie = findMovie(routerProps);
        return movie ? <EditMovie selectedMovie={movie}/> : <ClientFaultPage text="404 Not Found"/>;
    }

    const renderMainDashboard = () => {
        return data?.getAllMovies ?
            <MainDashboard loggedUser={getLoggedUser()}
                           movies={data?.getAllMovies}
                           showMyMovies={showMyMovies}
                           setShowMyMovies={setShowMyMovies}
            /> : null;
    }

    useEffect(() => {
        console.log(user.data);
        if (user.data) {
            subscribeToNewRatings();
        }
    }, [user.data])

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div className={styles.appContainer}>
                <Header loggedUser={getLoggedUser()}/>
                <Switch>
                    <Route exact path="/" render={renderMainDashboard}/>
                    <Route exact path="/sign-in" component={SignIn}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/add-movie" component={AddMovie}/>
                    <Route path="/movies/:movieId" render={(routerProps) =>
                        renderSelectedMovie(routerProps)
                    }/>
                    <Route path="/edit-movie/:movieId" render={(routerProps) =>
                        renderMovieEdition(routerProps)
                    }/>
                    <Route path="*" render={() => <ClientFaultPage text="404 Not Found"/>}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}
