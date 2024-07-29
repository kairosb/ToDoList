import { useDispatch } from 'react-redux';
import './taskForm.css'
import { v4 as uuidv4 } from 'uuid';
import { addTask, editTask } from '../../redux/todoSlice';
import { useForm } from 'react-hook-form';

export const TaskForm = ({ isOpen, onClose, task }) => {
    const dispatch = useDispatch();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors }
    } = useForm();


    if(!isOpen) return null;

    const handleSaveTask = ({ title, description = '' }) => {
        if(task) {
            dispatch(editTask({ ...task, title: title, description: description }))
        } else {
            const id = uuidv4();
            dispatch(addTask({ id: id, title, description, completed: false }));
        }
        reset();
        onClose();
    }

    const handleCloseModal = () => {
        reset();
        onClose();
    }

    return (
        <div className="modal__overlay" onClick={handleCloseModal}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSubmit(handleSaveTask)} className='modal__form'>
                    <div>{task? 'EDIT NOTE' : 'NEW NOTE'}</div>
                    <div className='modal__form__container'>
                        <div className='modal__form__containerTitle'>
                            <div>Title</div>
                            <input 
                                className='modal__form__inputTitle'
                                defaultValue={task? task.title : ''}
                                {...register('title', { required: 'Title is required' })}
                            />
                            {errors.title && <p className='modal__form__errorTitle'>{errors.title.message}</p>}
                        </div>
                        <div className='modal__form__containerDescription'>
                            <div>Description</div>
                            <textarea
                                className='modal__form__inputDescription'
                                defaultValue={task ? task.description : ''}
                                {...register('description')}
                                rows="4"
                                cols="50"
                            />
                        </div>
                    </div>
                    <div className='modal__form__containerButtons'>
                        <button className="modal__form__buttonCancel" onClick={handleCloseModal}>Cancel</button>
                        <button className='modal__form__buttonSave' type='submit'>{task ? 'Save changes' : 'Add Task'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}