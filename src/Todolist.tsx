import React, {ChangeEvent, FC} from 'react';
import './App.css';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {Button, Checkbox} from '@material-ui/core';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from './state/tasks-reducer';
import {FilterValuesType} from './state/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from './state/store';

type PropsType = {
    id: string,
    title: string,
    filter: FilterValuesType,
    changeFilter: (toDoListId: string, filter: FilterValuesType) => void,
    deleteToDoList: (toDoListId: string) => void,
    changeToDoListTitle: (toDoListId: string, title: string) => void,
}

export const Todolist: FC<PropsType> = (props) => {
    const {
        id,
        title,
        filter,
        changeFilter,
        deleteToDoList,
        changeToDoListTitle
    } = props;

    const dispatch = useDispatch();
    const tasks = useSelector<AppStateType, Array<TaskType>>(state => state.tasks[id]);

    const addTaskHandler = (title: string) => {
        dispatch(addTaskAC(id, title));
    };
    const onChangeToDoListTitleHandler = (title: string) => {
        changeToDoListTitle(id, title);
    }

    const deleteTodoListHandler = () => {
        deleteToDoList(id);
    };

    const onAllClickHandler = () => changeFilter(id, 'ALL');
    const onActiveClickHandler = () => changeFilter(id, 'ACTIVE');
    const onCompletedClickHandler = () => changeFilter(id, 'COMPLETED');

    let filteredTasks;
    switch (filter) {
        case 'ALL':
            filteredTasks = tasks;
            break;
        case 'ACTIVE':
            filteredTasks = tasks.filter(t => !t.isDone);
            break;
        case 'COMPLETED':
            filteredTasks = tasks.filter(t => t.isDone);
            break;
    };

    const tasksToDisplay = filteredTasks.map(task => {
        const onClickHandler = () => dispatch(removeTaskAC(id, task.id));
        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(id, task.id, event.currentTarget.checked));
        const changeTaskTitleHandler = (title: string) => dispatch(changeTaskTitleAC(id, task.id, title));

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