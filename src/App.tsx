import React from 'react';
import './App.module.sass';
import {ApolloProvider} from "@apollo/client";
import MainDashboard from "./components/MainDashboard/MainDashboard";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {SignIn} from "./components/UserManagament/SignIn";
import Register from "./components/UserManagament/Register";
import ClientFaultPage from "./components/ClientFaultPage/ClientFaultPage";
import {useAppApolloClient} from "./hooks/useAppApolloClient";
import Header from "./components/Header/Header";
import AddMovie from "./components/MovieInput/AddMovie";
import {RouteComponentProps} from "react-router";
import MovieDisplay from "./components/MovieDisplay/MovieDisplay";
import {EditMovie} from "./components/MovieInput/EditMovie";
import styles from "./App.module.sass";

// Adding repository name at the URL beginning to satisfy Github Pages.
const URL_PREFIX = "/movie-library-ui";
const App = () => {
    const client = useAppApolloClient();

    const renderSelectedMovie = (routerProps: RouteComponentProps<any>) => {
        return <MovieDisplay selectedMovieId={routerProps.match.params.movieId}/>
    }

    const renderMovieEdition = (routerProps: RouteComponentProps<any>) => {
        return <EditMovie selectedMovieId={routerProps.match.params.movieId}/>
    }

    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <div className={styles.appContainer}>
                    <Header/>
                    <Switch>
                        <Route exact path={`${URL_PREFIX}/movie-library-ui/`} component={MainDashboard}/>
                        <Route exact path={`${URL_PREFIX}/sign-in"`} component={SignIn}/>
                        <Route exact path={`${URL_PREFIX}/register`} component={Register}/>
                        <Route exact path={`${URL_PREFIX}/add-movie`} component={AddMovie}/>
                        <Route path={`${URL_PREFIX}/movies/:movieId`} render={(routerProps) =>
                            renderSelectedMovie(routerProps)
                        }/>
                        <Route path={`${URL_PREFIX}/edit-movie/:movieId`} render={(routerProps) =>
                            renderMovieEdition(routerProps)
                        }/>
                        <Route path="*" render={() => <ClientFaultPage text="404 Not Found"/>}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
