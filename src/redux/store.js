import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if(serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        return undefined;
    }
}

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (error) {
        console.error(error);
    }
}

export const store = configureStore({
    reducer: {
        todos: todoReducer
    },
    preloadedState: loadState()
});

store.subscribe(() => {
    saveState(store.getState());
});

export default store;