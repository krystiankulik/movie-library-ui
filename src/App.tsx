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
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <div className={styles.appContainer}>
                    <Header/>
                    <Switch>
                        <Route exact path="/" component={MainDashboard}/>
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
        </ApolloProvider>
    );
}

export default App;
