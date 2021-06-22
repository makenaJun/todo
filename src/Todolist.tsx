import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from './App';
import './App.css';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (newTaskTitle: string, todolistId: string) => void
    deleteTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    deleteTodoList: (todolistId: string) => void
}

export const Todolist: FC<PropsType> = (props) => {
    const {id, title, tasks, filter, addTask, deleteTask, changeFilter, changeTaskStatus, deleteTodoList} = props;
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null)

    const onAddTaskHandler = () => {
        if (newTaskTitle.trim() !== '') {
            addTask(newTaskTitle.trim(), id);
            setNewTaskTitle('');
        } else {
            setError('Field is required');
        }
    };
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.ctrlKey && event.key === 'Enter') {
            onAddTaskHandler();
        }
    };
    const onChangeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value);
        setError(null)
    };

    const deleteTodoListHandler = () => {
        deleteTodoList(id)
    }

    const onAllClickHandler = () => changeFilter('ALL', id);
    const onActiveClickHandler = () => changeFilter('ACTIVE', id);
    const onCompletedClickHandler = () => changeFilter('COMPLETED', id);


    const tasksToDisplay = tasks.map(task => {
        const onClickHandler = () => deleteTask(task.id, id)
        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, event.currentTarget.checked, id)

        return (<li className={task.isDone ? 'is-done' : ''} key={task.id}>
                <input type="checkbox" checked={task.isDone} onChange={onChangeHandler}/>
                <span>{task.title}</span>
                <button onClick={onClickHandler}>x</button>
            </li>
        )
    });

    return (
        <div>
            <h3>{title}
                <button onClick={deleteTodoListHandler}>x</button>
            </h3>
            <div>
                <input onKeyDown={onKeyDownHandler} onChange={onChangeTaskTitleHandler} value={newTaskTitle}
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