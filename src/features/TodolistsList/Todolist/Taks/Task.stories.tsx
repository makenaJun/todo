import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from './Task';
import {TaskPriorities, TaskStatuses, TaskType} from '../../../../api/todolists-api';
import {Provider} from 'react-redux';
import {store} from '../../../../app/store';


export default {
    title: 'Components/Task',
    component: Task,
} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = () => {
    const task1: TaskType = {
        id: '1', title: 'Hello', status: TaskStatuses.New, completed: false,
        addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
        deadline: '', description: '', todoListId: 'todolistId2'
    };
    const task2: TaskType = {
        id: '2', title: 'World', status: TaskStatuses.Completed, completed: false,
        addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
        deadline: '', description: '', todoListId: 'todolistId2'
    };


    return <>
        <Provider store={store}>
            <Task task={task1}/>
            <Task task={task2}/>
        </Provider>
    </>
}

export const TaskBaseExample = Template.bind(
    {}
);
