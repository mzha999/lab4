import React from 'react';
import useGet from './hooks/useGet';
import axios from 'axios';

const AppContext = React.createContext({
    todos: []
});

function AppContextProvider({ children }) {

    // TODO Exercise

    // The context value that will be supplied to any descendants of this component.
    const context = {
        todos: []
    };

    // Wraps the given child components in a Provider for the above context.
    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    );
}

export {
    AppContext,
    AppContextProvider
};