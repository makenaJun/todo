import {applyMiddleware, combineReducers, createStore} from 'redux';
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import thunk from 'redux-thunk';
import {appReducer} from './app-reducer';
import {authReducer} from '../features/Login/auth-reducer';

const rootReducer = combineReducers({
    toDoLists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;


export const store = createStore(rootReducer, applyMiddleware(thunk));