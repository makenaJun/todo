import React, {ChangeEvent, FC, useCallback} from 'react';
import {Checkbox} from '@material-ui/core';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {TaskStatuses, TaskType} from '../../../../api/todolists-api';
import {useDispatch} from 'react-redux';
import {deleteTask, updateTask} from '../../tasks-reducer';

type PropsType = {
    task: TaskType,
}

export const Task: FC<PropsType> = React.memo((props) => {
    const {task} = props;
    const dispatch = useDispatch();

    const onClickHandler = () => dispatch(deleteTask(task.todoListId, task.id));

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const checked = event.currentTarget.checked;
        if (checked) {
            dispatch(updateTask(task.todoListId, task.id, {status: TaskStatuses.Completed}));
        } else {
            dispatch(updateTask(task.todoListId, task.id, {status: TaskStatuses.New}));
        }
    }
    const changeTaskTitleHandler = useCallback((title: string) =>
        dispatch(updateTask(task.todoListId, task.id, {title})), [dispatch, task.todoListId, task.id]);

    return (<div key={task.id}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
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
})