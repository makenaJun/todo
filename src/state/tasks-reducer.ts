import {v1} from 'uuid';
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from '../api/todolists-api';

type ActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>

export type TasksStateType = {
    [key: string]: Array<TaskType>
};

const initialState: TasksStateType = {};


export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.toDoListId]: state[action.toDoListId].filter(t => t.id !== action.taskId),
            };
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.toDoListId]: [{
                    id: v1(),
                    title: action.title,
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Low,
                    addedDate: '',
                    startDate: '',
                    deadline: '',
                    description: '',
                    todoListId: action.toDoListId,
                    completed: false,
                    order: 0
                }, ...state[action.toDoListId]],
            };
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.toDoListId]: state[action.toDoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.newTitle
                } : t)
            };
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.toDoListId]: state[action.toDoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status,
                } : t)
            };
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todoListId]: []
            };
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        default:
            return state;
    }
};

export const removeTaskAC = (toDoListId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        toDoListId,
        taskId,
    } as const;
};

export const addTaskAC = (toDoListId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        toDoListId,
        title,
    } as const;
};

export const changeTaskTitleAC = (toDoListId: string, taskId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        toDoListId,
        taskId,
        newTitle,
    } as const;
};

export const changeTaskStatusAC = (toDoListId: string, taskId: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        toDoListId,
        taskId,
        status,
    } as const;
};

