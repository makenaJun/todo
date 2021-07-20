import React, {ChangeEvent, FC} from 'react';
import {FilterValuesType} from './App';
import './App.css';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {Button, Checkbox} from '@material-ui/core';

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
    addTask: (newTaskTitle: string, toDoListId: string) => void
    deleteTask: (taskId: string, toDoListId: string) => void
    changeFilter: (filter: FilterValuesType, toDoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, toDoListId: string) => void
    deleteToDoList: (toDoListId: string) => void
    changeTaskTitle: (title: string, toDoListId: string, taskId: string) => void
    changeToDoListTitle: (title: string, toDoListId: string) => void
}

export const Todolist: FC<PropsType> = (props) => {
    const {
        id,
        title,
        tasks,
        filter,
        addTask,
        deleteTask,
        changeFilter,
        changeTaskStatus,
        deleteToDoList,
        changeTaskTitle,
        changeToDoListTitle
    } = props;

    const addTaskHandler = (title: string) => {
        addTask(title, id);
    };
    const onChangeToDoListTitleHandler = (title: string) => {
        changeToDoListTitle(title, id);
    }


    const deleteTodoListHandler = () => {
        deleteToDoList(id)
    };

    const onAllClickHandler = () => changeFilter('ALL', id);
    const onActiveClickHandler = () => changeFilter('ACTIVE', id);
    const onCompletedClickHandler = () => changeFilter('COMPLETED', id);

    const tasksToDisplay = tasks.map(task => {
        const onClickHandler = () => deleteTask(task.id, id)
        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, event.currentTarget.checked, id)
        const changeTaskTitleHandler = (title: string) => changeTaskTitle(title, id, task.id);

        return (<div key={task.id}>
                <Checkbox
                    checked={task.isDone}
                    onChange={onChangeHandler}
                    name="checkedB"
                    color="primary"
                />
                <EditableSpan title={task.title} onChange={changeTaskTitleHandler}/>
                <IconButton onClick={onClickHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
        )

    });

    return (
        <div>
            <h3><EditableSpan title={title} onChange={onChangeToDoListTitleHandler}/>
                <IconButton onClick={deleteTodoListHandler}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            <ul>
                {tasksToDisplay.length ? tasksToDisplay : 'There is nothing'}
            </ul>
            <div>
                <Button size={'small'}
                        variant={filter === 'ALL' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}>All</Button>

                <Button size={'small'}
                        variant={filter === 'ACTIVE' ? 'contained' : 'text'}
                        color={'primary'}
                        onClick={onActiveClickHandler}>Active
                </Button>

                <Button size={'small'}
                        variant={filter === 'COMPLETED' ? 'contained' : 'text'}
                        color={'secondary'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
}