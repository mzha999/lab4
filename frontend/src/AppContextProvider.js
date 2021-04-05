import React from 'react';
import useGet from './hooks/useGet';
import axios from 'axios';

const AppContext = React.createContext({
    todos: []
});

function AppContextProvider({ children }) {

    // TODO Exercise
    const { data: todos, isLoading: todoLoading, reFetch: refetch } = useGet('/api/todos', []);
    // The context value that will be supplied to any descendants of this component.
    
    async function addTodo(title, description, dueDate, isComplete) {
        const todoToUpload = {
            title,
            description,
            dueDate,
            isComplete
        };
        const todoResponse = await axios.post('/api/todos', todoToUpload);
        refetch();
        return todoResponse.data;
    }


    const context = {
        todos,
        addTodo,
        todoLoading,
        refetch
    };
    // Wraps the given child components in a Provider for the above context.
    return ( 
        <AppContext.Provider value = { context } > { children } </AppContext.Provider>
        
    );
}

export {
    AppContext,
    AppContextProvider
};