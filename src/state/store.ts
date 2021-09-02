import {applyMiddleware, combineReducers, createStore} from 'redux';
import {todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    toDoLists: todolistsReducer,
    tasks: tasksReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;


export const store = createStore(rootReducer, applyMiddleware(thunk));