import {Dispatch} from 'redux';
import {CreateTodolistDataType, todolistsApi, TodolistType} from '../../api/todolists-api';
import {ResultCode} from '../../api/api';
import {RequestStatusType, SetAppErrorActionType, setAppStatus, SetAppStatusActionType} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {getTasks} from './tasks-reducer';
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from '../../app/store';

const initialState: ToDoListsStateType = [];

export const todolistsReducer = (state: ToDoListsStateType = initialState, action: ActionsType): ToDoListsStateType => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id);
        }
        case 'ADD-TODOLIST': {
            return [{
                ...action.todoList,
                filter: 'ALL',
                entityStatus: 'idle',
            }, ...state];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        }
        case 'SET-TODOLIST': {
            return action.todolists.map(t => ({
                ...t,
                filter: 'ALL',
                entityStatus: 'idle',
            }));
        }
        case 'SET-TODOLIST-ENTITY-STATUS': {
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl);

        }
        case 'CLEAR-TODOLISTS-DATA': {
            return [];
        }
        default:
            return state;
    }
}

//ACTIONS

export const removeTodolistAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', id} as const;
};

export const addTodolistAC = (todoList: TodolistType) => {
    return {type: 'ADD-TODOLIST', todoList} as const;
};

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title} as const;
};

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter} as const;
};

export const setTodoLists = (todolists: Array<TodolistType>) => {
    return {type: 'SET-TODOLIST', todolists} as const;
};

export const setTodoListsEntityStatus = (id: string, entityStatus: RequestStatusType) => {
    return {type: 'SET-TODOLIST-ENTITY-STATUS', id, entityStatus} as const;
};

export const clearTodolistsData = () => {
    return {type: 'CLEAR-TODOLISTS-DATA'} as const;
};

// THUNKS

export const getTodolists = (): ThunkGetTodolistDispatchType => async (dispatch) => {
    try {
        dispatch(setAppStatus('loading'));
        const res = await todolistsApi.getTodolists();
        dispatch(setTodoLists(res.data));
        dispatch(setAppStatus('succeeded'));
        // Tasks request
        res.data.forEach(tl => dispatch(getTasks(tl.id)));
    } catch (error) {
        handleServerNetworkError(dispatch, error);
    }
};

export const createTodolist = (title: string) => async (dispatch: ThunkDispatch) => {
    try {
        dispatch(setAppStatus('loading'));
        const res = await todolistsApi.createTodolist(title);
        if (res.data.resultCode === ResultCode.SUCCESS) {
            const todoList = res.data.data.item;
            dispatch(setAppStatus('succeeded'));
            dispatch(addTodolistAC(todoList));
        } else {
            handleServerAppError<CreateTodolistDataType>(dispatch, res.data);
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error);
    }
};

export const deleteTodolist = (todolistId: string) => async (dispatch: ThunkDispatch) => {
    try {
        dispatch(setAppStatus('loading'));
        dispatch(setTodoListsEntityStatus(todolistId, 'loading'));
        const res = await todolistsApi.deleteTodolist(todolistId);
        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(setAppStatus('succeeded'));
            dispatch(removeTodolistAC(todolistId));
        } else {
            handleServerAppError(dispatch, res.data);
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error);
    }
};

export const updateTodolistTitle = (todolistId: string, title: string) => async (dispatch: ThunkDispatch) => {
    try {
        dispatch(setAppStatus('loading'));
        const res = await todolistsApi.updateTodolist(todolistId, title);
        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(setAppStatus('succeeded'));
            dispatch(changeTodolistTitleAC(todolistId, title));
        } else {
            handleServerAppError(dispatch, res.data);
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error);
    }
};

//TYPES

export type FilterValuesType = 'ALL' | 'ACTIVE' | 'COMPLETED';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType,
};

type ThunkGetTodolistDispatchType = ThunkAction<void, AppStateType, unknown, ActionsType | SetAppErrorActionType | SetAppStatusActionType>

type ThunkDispatch = Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType>

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodoListsEntityStatus>
    | SetTodolistsActionType
    | ClearTodolistsActionType

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodoLists>
export type ClearTodolistsActionType = ReturnType<typeof clearTodolistsData>

export type ToDoListsStateType = Array<TodolistDomainType>;