import React from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {AppStateType} from '../app/store';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';
import thunk from 'redux-thunk';
import {appReducer} from '../app/app-reducer';
import {authReducer} from '../features/Login/auth-reducer';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    toDoLists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})

const initialGlobalState = {
    toDoLists: [
        {id: 'todolistId1', title: 'What to learn?', filter: 'ALL', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy?', filter: 'ALL', addedDate: '', order: 0, entityStatus: 'loading'},
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
    },
    app: {
        status: 'idle',
        error: null,
        isInitialized: true,
    },
    auth: {
        isLoggedIn: true,
    },
}


const storyBookStore = createStore(rootReducer, initialGlobalState as AppStateType, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>;
};