import { createSelector } from "@reduxjs/toolkit";

export const selectFilteredTasks = createSelector(
    state => state.todos.tasks,
    state => state.todos.filter,
    state => state.todos.search,
    (tasks, filter, search) => {
        let filteredTasks = tasks;

        if( filter === 'COMPLETED'){
            filteredTasks = filteredTasks.filter(task => task.completed);
        } else if(filter === 'INCOMPLETE'){
            filteredTasks = filteredTasks.filter(task => !task.completed);
        }
        
        if(search) {
            filteredTasks = filteredTasks.filter(task => 
                task.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        return filteredTasks;
    }
)