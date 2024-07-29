import { useState } from 'react'
import './task.css'
import { CaretDown, CaretRight, PencilSimple, Trash } from 'phosphor-react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleComplete } from '../../redux/todoSlice';

export const Task = ( { id, title, description, onEdit, completed } ) => {

    const dispatch = useDispatch();

    const [ visibleDescription, setVisibleDescription ] = useState(false);

    const handleEditTask = () => {
        if(onEdit) {
            onEdit({ id, title, description, completed });
        }
    } 

    const handleDeleteTask = () => {
        dispatch(deleteTask(id));
    }

    const handleToggleCompleted = () => {
        dispatch(toggleComplete(id));
    }

    return (
        <div 
            className='containerTask'
        >
            <div className='task'>
                <input 
                    className='task__checkbox' 
                    type='checkbox' 
                    defaultChecked={completed} 
                    onClick={() => handleToggleCompleted()}
                />
                <label className='task__title'>{title}</label>
    
                <div className='containerIcons'>
                    <PencilSimple 
                        size={20} 
                        className='icons' 
                        onClick={() => handleEditTask()}
                    />
                    <Trash 
                        size={20} 
                        className='icons' 
                        onClick={() => handleDeleteTask()}
                    />
                </div>

                {
                    visibleDescription?
                        <CaretDown 
                            onClick={ () => setVisibleDescription(!visibleDescription)} 
                            size={24}
                            className='iconsCaret'
                        />
                    :
                        <CaretRight 
                            onClick={ () => setVisibleDescription(!visibleDescription)} 
                            size={24} 
                            className='iconsCaret'
                        />
                }
            </div>
            {
                visibleDescription ? 
                    <p className='task__description'>{description}</p>
                : <></>
            }
        </div>
    )
}