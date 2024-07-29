import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    tasks: [],
    filter: 'ALL',
    search: ''
}

export const slice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTask: (state, { payload }) => {
            state.tasks.push(payload);
        },
        editTask: (state, { payload }) => {
            const { id, title, description, completed } = payload;
            const task = state.tasks.find(task => task.id === id);
            if (task) {
                task.title = title;
                task.description = description;
                task.completed = completed;
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
        },
        searchTasks: (state, {payload}) => {
            state.search = payload;
        },
        reorderTasks(state, {payload} ) {
            const { sourceIndex, destinationIndex } = payload;
            const [movedTask] = state.tasks.splice(sourceIndex, 1);
            state.tasks.splice(destinationIndex, 0, movedTask);
        }
    }
})

export const { addTask, editTask, deleteTask, toggleComplete, filterTasks, searchTasks, reorderTasks } = slice.actions;

export default slice.reducer;