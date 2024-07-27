import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    tasks: [],
}

export const slice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTask: (state, { payload }) => {
            state.tasks.push(payload);
        },
        editTask: (state, { payload }) => {
            const {id, title, description} = payload;
            const task = state.tasks.find(task => task.id === id);
            if (task) {
                task.title = title;
                task.description = description;
            }
        },
        deleteTask: (state, { payload }) => {
            state.tasks = state.tasks.filter(task => task.id !== payload);
        },
        toggleComplete: (state, { payload }) => {
            const task = state.tasks.find(task => task.id === payload);
            if(task){
                task.completed = !task.completed;
            }
        },
        filterTasks: (state, { payload }) => {
            state.filter = payload;
        }
    }
})

export const { addTask, editTask, deleteTask, toggleComplete, filterTasks } = slice.actions;

export default slice.reducer;