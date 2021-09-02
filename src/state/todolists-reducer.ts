import {Dispatch} from 'redux';
import {todolistsApi, TodolistType} from '../api/todolists-api';
import {ResultCode} from '../api/api';

export type FilterValuesType = 'ALL' | 'ACTIVE' | 'COMPLETED';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
};

type ActionsType =
    ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodoLists>

export type ToDoListsStateType = Array<TodolistDomainType>;

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
            }, ...state];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        }
        case 'SET-TODOLIST': {
            return action.todolists.map(t => {
                return {
                    ...t,
                    filter: 'ALL',
                }
            });
        }
        default:
            return state;
    }
}

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

// THUNKS

export const getTodolists = () => async (dispatch: Dispatch) => {
    const res = await todolistsApi.getTodolists();

    dispatch(setTodoLists(res.data));
};

export const createTodolist = (title: string) => async (dispatch: Dispatch) => {
    const res = await todolistsApi.createTodolist(title);
    if (res.data.resultCode === ResultCode.SUCCESS) {
        const todoList = res.data.data.item;
        dispatch(addTodolistAC(todoList));
    }
};

export const deleteTodolist = (todolistId: string) => async (dispatch: Dispatch) => {
    const res = await todolistsApi.deleteTodolist(todolistId);
    if (res.data.resultCode === ResultCode.SUCCESS) {
        dispatch(removeTodolistAC(todolistId));
    }
};

export const updateTodolistTitle = (todolistId: string, title: string) => async (dispatch: Dispatch) => {
    const res = await todolistsApi.updateTodolist(todolistId, title);
    if (res.data.resultCode === ResultCode.SUCCESS) {
        dispatch(changeTodolistTitleAC(todolistId, title));
    }
};
