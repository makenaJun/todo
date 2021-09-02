import {addTodolistAC, removeTodolistAC, setTodoLists} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi, UpdateTaskType} from '../api/todolists-api';
import {Dispatch} from 'redux';
import {ResultCode} from '../api/api';
import {AppStateType} from './store';

type ActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodoLists>
    | ReturnType<typeof setTasks>
    | ReturnType<typeof updateTaskAC>

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
                [action.newTask.todoListId]: [action.newTask, ...state[action.newTask.todoListId]],
            };
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.toDoListId]: state[action.toDoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    ...action.model,
                } : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todoList.id]: []
            };
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        case 'SET-TODOLIST': {
            const copyState = {...state};
            action.todolists.forEach(tl => {
                copyState[tl.id] = [];
            })
            return copyState;
        }
        case 'SET-TASK': {
            return {
                ...state,
                [action.toDoListId]: action.tasks,
            };
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

export const addTaskAC = (newTask: TaskType) => {
    return {
        type: 'ADD-TASK',
        newTask,
    } as const;
};

export const updateTaskAC = (toDoListId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return {
        type: 'UPDATE-TASK',
        toDoListId,
        taskId,
        model,
    } as const;
};

export const setTasks = (toDoListId: string, tasks: Array<TaskType>) => {
    return {
        type: 'SET-TASK',
        toDoListId,
        tasks,
    } as const;
};

// THUNKS

export const getTasks = (todolistId: string) => async (dispatch: Dispatch) => {
    const res = await todolistsApi.getTasks(todolistId);
    const tasks = res.data.items;
    dispatch(setTasks(todolistId, tasks));
};

export const deleteTask = (todolistId: string, taskId: string) => async (dispatch: Dispatch) => {
    const res = await todolistsApi.deleteTask(todolistId, taskId);
    if (res.data.resultCode === ResultCode.SUCCESS) {
        dispatch(removeTaskAC(todolistId, taskId));
    }
};

export const createTask = (todolistId: string, title: string) => async (dispatch: Dispatch) => {
    const res = await todolistsApi.createTask(todolistId, title);
    if (res.data.resultCode === ResultCode.SUCCESS) {
        const newTask = res.data.data.item;
        dispatch(addTaskAC(newTask));
    }
};

export type UpdateDomainTaskModelType = {
    title?: string,
    description?: string,
    completed?: boolean,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string,
};


export const updateTask = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => async (dispatch: Dispatch, getState: () => AppStateType) => {
    const state = getState();
    const tasks = state.tasks[todolistId];
    const currentTask = tasks.find(t => t.id === taskId);

    if (currentTask) {
        const apiModel: UpdateTaskType = {
            status: currentTask.status,
            priority: currentTask.priority,
            startDate: currentTask.startDate,
            description: currentTask.description,
            deadline: currentTask.deadline,
            completed: currentTask.completed,
            title: currentTask.title,
            ...domainModel
        }

        const res = await todolistsApi.updateTask(todolistId, taskId, apiModel);
        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(updateTaskAC(todolistId, taskId, domainModel));
        }
    }
};


