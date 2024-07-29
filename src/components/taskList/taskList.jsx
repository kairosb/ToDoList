import { Detective, PlusCircle } from 'phosphor-react'
import { Task } from '../task/task'
import './taskList.css'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { TaskForm } from '../taskForm/taskForm'
import { selectFilteredTasks } from '../../redux/selectFilteredTasks'
import { useDispatch } from 'react-redux'
import { reorderTasks } from '../../redux/todoSlice'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const ItemType = 'TASK';

const DraggableTask = ({ task, index, moveTask }) => {
    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ItemType,
        hover: (item) => {
            if (item.index !== index) {
                moveTask(item.index, index);
                item.index = index;
            }
        },
    });

    return (
        <div
            ref={(node) => drag(drop(node))}
            className='container__task'
            style={{ opacity: isDragging ? 0.5 : 1 }}
        >
            <Task 
                id={task.id} 
                title={task.title} 
                description={task.description} 
                completed={task.completed}
                onEdit={task.onEdit}
            />
        </div>
    );
};

export const TaskList = () => {

    const dispatch = useDispatch();

    const tasks = useSelector(selectFilteredTasks);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const openModal = (task) => {
        setCurrentTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setCurrentTask(null);
        setIsModalOpen(false);
    };
    console.log('teste')

    const moveTask = (fromIndex, toIndex) => {
        dispatch(reorderTasks({
            sourceIndex: fromIndex,
            destinationIndex: toIndex
        }));
    };

    return (
        <DndProvider backend={HTML5Backend} >
            <div 
                className='containerTaskList'
            >
                <div className='taskList'>
                    {tasks.length === 0 ? (
                        <div> 
                            <Detective size={64} color="#6C63FF" /> 
                            <div>Empty...</div>    
                        </div>
                    ) : (
                        tasks.map(({ id, title, description, completed }, index) => (
                            <DraggableTask
                                key={id}
                                task={{id, title, description, completed}}
                                index={index}
                                moveTask={moveTask}
                            />
                        ))
                    )}
                </div>
                <div className='containerButtonAddTask' >
                    <div 
                        className='buttonAddTask' 
                    >    
                        <PlusCircle 
                            onClick={() => openModal(null)} 
                            size={54} 
                            color="#6C63FF" 
                            weight="fill" 
                        />
                    </div>
                </div>
                <TaskForm 
                    isOpen={isModalOpen} 
                    onClose={closeModal} 
                    task={currentTask}
                />
            </div>
        </DndProvider>
    )
}