import {applyMiddleware, combineReducers, createStore} from 'redux';
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    toDoLists: todolistsReducer,
    tasks: tasksReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;


export const store = createStore(rootReducer, applyMiddleware(thunk));