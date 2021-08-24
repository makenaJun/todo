import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from '../state/tasks-reducer';
import {todolistsReducer} from '../state/todolists-reducer';
import {AppStateType} from '../state/store';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    toDoLists: todolistsReducer,
})

const initialGlobalState = {
    toDoLists: [
        {id: 'todolistId1', title: 'What to learn?', filter: 'ALL', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy?', filter: 'ALL', addedDate: '', order: 0},
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'JS', status: TaskStatuses.New, completed: false,
                addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
                deadline: '', description: '', todoListId: 'todolistId1'
            },
            {id: v1(), title: 'HTML', status: TaskStatuses.Completed, completed: false,
                addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
                deadline: '', description: '', todoListId: 'todolistId1'},
            {id: v1(), title: 'React', status: TaskStatuses.New, completed: false,
                addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
                deadline: '', description: '', todoListId: 'todolistId1'},
        ],
        ['todolistId2']: [
            {id: v1(), title: 'JS Book', status: TaskStatuses.New, completed: false,
                addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
                deadline: '', description: '', todoListId: 'todolistId2'},
            {id: v1(), title: 'Milk', status: TaskStatuses.Completed, completed: false,
                addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
                deadline: '', description: '', todoListId: 'todolistId2'},
        ]
    }
}


const storyBookStore = createStore(rootReducer, initialGlobalState as AppStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>;
};