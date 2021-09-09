import React, {FC, useCallback} from 'react';
import '../../../app/App.css';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {Button} from '@material-ui/core';
import {createTask} from '../tasks-reducer';
import {changeTodolistFilterAC, deleteTodolist, TodolistDomainType, updateTodolistTitle} from '../todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../../app/store';
import {Task} from './Taks/Task';
import {TaskStatuses, TaskType} from '../../../api/todolists-api';

type PropsType = {
    todolist: TodolistDomainType,
}

export const Todolist: FC<PropsType> = React.memo((props) => {
    const {
        todolist,
    } = props;


    const dispatch = useDispatch();
    const tasks = useSelector<AppStateType, Array<TaskType>>(state => state.tasks[todolist.id]);

    const addTaskHandler = useCallback((title: string) => {
        dispatch(createTask(todolist.id, title));
    }, [dispatch, todolist.id]);

    const onChangeToDoListTitleHandler = useCallback((title: string) => {
        dispatch(updateTodolistTitle(todolist.id, title));
    }, [dispatch, todolist.id]);

    const deleteTodoListHandler = useCallback(() => dispatch(deleteTodolist(todolist.id)), [dispatch, todolist.id]);


    const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(todolist.id, 'ALL')), [dispatch, todolist.id]);
    const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(todolist.id, 'ACTIVE')), [dispatch, todolist.id]);
    const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(todolist.id, 'COMPLETED')), [dispatch, todolist.id]);

    let filteredTasks: Array<TaskType>;
    switch (todolist.filter) {
        case 'ALL':
            filteredTasks = tasks;
            break;
        case 'ACTIVE':
            filteredTasks = tasks.filter(t => t.status === TaskStatuses.New);
            break;
        case 'COMPLETED':
            filteredTasks = tasks.filter(t => t.status === TaskStatuses.Completed);
            break;
    }

    const tasksToDisplay = filteredTasks.map(task => <Task key={task.id}
                                                           task={task}
        />
    );

    const disabled = todolist.entityStatus === 'loading';

    return (
        <div>
            <h3><EditableSpan title={todolist.title} onChange={onChangeToDoListTitleHandler} disabled={disabled}/>
                <IconButton onClick={deleteTodoListHandler} disabled={disabled}>
                    <DeleteIcon/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler} disabled={disabled}/>
            <ul>
                {tasksToDisplay.length ? tasksToDisplay : 'There is nothing'}
            </ul>
            <div>
                <Button size={'small'}
                        variant={todolist.filter === 'ALL' ? 'contained' : 'text'}
                        onClick={onAllClickHandler}>All</Button>

                <Button size={'small'}
                        variant={todolist.filter === 'ACTIVE' ? 'contained' : 'text'}
                        color={'primary'}
                        onClick={onActiveClickHandler}>Active
                </Button>

                <Button size={'small'}
                        variant={todolist.filter === 'COMPLETED' ? 'contained' : 'text'}
                        color={'secondary'}
                        onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
        </div>
    )
})