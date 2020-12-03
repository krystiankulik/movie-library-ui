import React from 'react';
import './App.module.sass';
import {ApolloProvider} from "@apollo/client";
import {useAppApolloClient} from "./hooks/useAppApolloClient";
import {AppContainer} from "./components/AppContainer/AppContainer";

const App = () => {
    const client = useAppApolloClient();

    return (
        <ApolloProvider client={client}>
            <AppContainer/>
        </ApolloProvider>
    );
}

export default App;
