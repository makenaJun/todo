import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from '../state/tasks-reducer';
import {todolistsReducer} from '../state/todolists-reducer';
import {AppStateType} from '../state/store';
import {v1} from 'uuid';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    toDoLists: todolistsReducer,
})

const initialGlobalState = {
    toDoLists: [
        {id: 'todolistId1', title: 'What to learn?', filter: 'ALL'},
        {id: 'todolistId2', title: 'What to buy?', filter: 'ALL'},
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        ['todolistId2']: [
            {id: v1(), title: 'JS Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
        ]
    }
}


const storyBookStore = createStore(rootReducer, initialGlobalState as AppStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>;
};