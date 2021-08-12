import React from 'react';
import {action} from '@storybook/addon-actions';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from './Task';
import {TaskType} from './state/tasks-reducer';


export default {
    title: 'Components/Task',
    component: Task,
} as ComponentMeta<typeof Task>;

const changeTaskTitleCallback = action(`Title changed`);
const changeTaskStatusCallback = action(`Status changed`);
const removeTaskCallback = action(`Task removed`);


const Template: ComponentStory<typeof Task> = () => {
    const task1: TaskType = {id: '1', title: 'Hello', isDone: false};
    const task2: TaskType = {id: '2', title: 'World', isDone: true};


    return <>
        <Task task={task1}
              changeTaskTitle={changeTaskTitleCallback}
              changeTaskStatus={changeTaskStatusCallback}
              removeTask={removeTaskCallback} />
        <Task task={task2}
              changeTaskTitle={changeTaskTitleCallback}
              changeTaskStatus={changeTaskStatusCallback}
              removeTask={removeTaskCallback} />
        </>
        }

        export const TaskBaseExample = Template.bind(
        {
        }
        );
