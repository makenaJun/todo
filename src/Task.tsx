import React, {ChangeEvent, FC, useCallback} from 'react';
import {TaskType} from './state/tasks-reducer';
import {Checkbox} from '@material-ui/core';
import {EditableSpan} from './EditableSpan';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

type PropsType = {
    task: TaskType,
    changeTaskTitle: (title: string, taskId: string) => void,
    removeTask: (taskId: string) => void,
    changeTaskStatus: (taskId: string, checked: boolean) => void,
}

export const Task: FC<PropsType> = React.memo((props) => {
    const {task, changeTaskTitle, changeTaskStatus, removeTask} = props;
    const onClickHandler = () => removeTask(task.id);
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, event.currentTarget.checked);
    const changeTaskTitleHandler = useCallback((title: string) => changeTaskTitle(title, task.id), [changeTaskTitle, task.id]);

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
})