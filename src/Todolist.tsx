import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import './App.css';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (newTaskTitle: string) => void
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Todolist: FC<PropsType> = (props) => {
    const {title, tasks, filter, addTask, deleteTask, changeFilter, changeTaskStatus} = props;
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null)

    const onAddTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            addTask(newTaskTitle.trim());
            setNewTaskTitle('');
        } else {
            setError('Field is required');
        }
    };
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.ctrlKey && event.key === 'Enter') {
            onAddTaskHandler();
        }
    };
    const onChangeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value);
        setError(null)
    };

    const onAllClickHandler = () => changeFilter('ALL');
    const onActiveClickHandler = () => changeFilter('ACTIVE');
    const onCompletedClickHandler = () => changeFilter('COMPLETED');

    const tasksToDisplay = tasks.map(task => {
        const onClickHandler = () => deleteTask(task.id)
        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, event.currentTarget.checked)

        return (<li className={task.isDone ? 'is-done' : ''} key={task.id}>
                <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                <span>{task.title}</span>
                <button onClick={onClickHandler}>x</button>
            </li>
        )
    });

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input onKeyDown={onKeyPressHandler} onChange={onChangeTaskTitleHandler} value={newTaskTitle}
                       className={error ? 'errorInput' : ''}/>
                <button onClick={onAddTaskHandler}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {tasksToDisplay}
            </ul>
            <div>
                <button className={filter === 'ALL' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={filter === 'ACTIVE' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active
                </button>
                <button className={filter === 'COMPLETED' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}