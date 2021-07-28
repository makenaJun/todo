import {v1} from 'uuid';

export type FilterValuesType = 'ALL' | 'ACTIVE' | 'COMPLETED';

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}

type ActionsType =
    ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>

export type ToDoListsStateType = Array<TodolistType>;

const initialState: ToDoListsStateType = [];

export const todolistsReducer = (state: ToDoListsStateType = initialState, action: ActionsType): ToDoListsStateType => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id);
        }
        case 'ADD-TODOLIST': {
            return [{id: action.todoListId, title: action.title, filter: 'ALL'}, ...state];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', id} as const;
};

export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', todoListId: v1(), title} as const;
};

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title} as const;
};

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter} as const;
};
