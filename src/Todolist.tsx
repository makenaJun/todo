import React, {FC, useCallback} from 'react';
import './App.css';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {Button} from '@material-ui/core';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from './state/tasks-reducer';
import {FilterValuesType} from './state/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from './state/store';
import {Task} from './Task';

type PropsType = {
    id: string,
    title: string,
    filter: FilterValuesType,
    changeFilter: (toDoListId: string, filter: FilterValuesType) => void,
    deleteToDoList: (toDoListId: string) => void,
    changeToDoListTitle: (toDoListId: string, title: string) => void,
}

export const Todolist: FC<PropsType> = React.memo((props) => {
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

    const addTaskHandler = useCallback((title: string) => {
        dispatch(addTaskAC(id, title));
    }, [dispatch, id]);
    const changeTaskTitleHandler = useCallback((title: string, taskId: string) => {
        dispatch(changeTaskTitleAC(id, taskId, title));
    }, [dispatch, id]);

    const changeTaskStatusHandler = useCallback((taskId: string, checked: boolean) => {
        dispatch(changeTaskStatusAC(id, taskId, checked));
    }, [dispatch, id]);

    const removeTaskHandler = useCallback((taskId: string) => dispatch(removeTaskAC(id, taskId)), [dispatch, id]);


    const onChangeToDoListTitleHandler = useCallback((title: string) => {
        changeToDoListTitle(id, title);
    }, [changeToDoListTitle, id]);

    const deleteTodoListHandler = useCallback(() => deleteToDoList(id), [deleteToDoList, id]);


    const onAllClickHandler = useCallback(() => changeFilter(id, 'ALL'), [changeFilter, id]);
    const onActiveClickHandler = useCallback(() => changeFilter(id, 'ACTIVE'), [changeFilter, id]);
    const onCompletedClickHandler = useCallback(() => changeFilter(id, 'COMPLETED'), [changeFilter, id]);

    let filteredTasks: Array<TaskType>;
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
    }

    const tasksToDisplay = filteredTasks.map(task => <Task key={task.id}
                                                           task={task}
                                                           changeTaskTitle={changeTaskTitleHandler}
                                                           removeTask={removeTaskHandler}
                                                           changeTaskStatus={changeTaskStatusHandler}
        />
    );

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
})