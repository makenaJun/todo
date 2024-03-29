import {
    CreateUpdateTaskDataType,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsApi,
    UpdateTaskType
} from '../../api/todolists-api';
import {Dispatch} from 'redux';
import {ResultCode} from '../../api/api';
import {AppStateType} from '../../app/store';
import {
    AddTodolistActionType,
    ClearTodolistsActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from './todolists-reducer';
import {SetAppErrorActionType, setAppStatus, SetAppStatusActionType} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';

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
                [action.toDoListId]: state[action.toDoListId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
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
        case 'CLEAR-TODOLISTS-DATA': {
            return {};
        }
        default:
            return state;
    }
};

//ACTIONS

export const removeTaskAC = (toDoListId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', toDoListId, taskId} as const
};
export const addTaskAC = (newTask: TaskType) => {
    return {type: 'ADD-TASK', newTask} as const
};
export const updateTaskAC = (toDoListId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return {type: 'UPDATE-TASK', toDoListId, taskId, model,} as const;
};
export const setTasks = (toDoListId: string, tasks: Array<TaskType>) => {
    return {type: 'SET-TASK', toDoListId, tasks,} as const;
};

// THUNKS

export const getTasks = (todolistId: string) => async (dispatch: ThunkDispatch) => {
    try {
        dispatch(setAppStatus('loading'));
        const res = await todolistsApi.getTasks(todolistId);
        const tasks = res.data.items;
        dispatch(setTasks(todolistId, tasks));
        dispatch(setAppStatus('succeeded'));
    } catch (error) {
        handleServerNetworkError(dispatch, error);
    }
};

export const deleteTask = (todolistId: string, taskId: string) => async (dispatch: ThunkDispatch) => {
    try {
        dispatch(setAppStatus('loading'));
        const res = await todolistsApi.deleteTask(todolistId, taskId);
        if (res.data.resultCode === ResultCode.SUCCESS) {
            dispatch(setAppStatus('succeeded'));
            dispatch(removeTaskAC(todolistId, taskId));
        } else {
            handleServerAppError(dispatch, res.data);
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error);
    }
};

export const createTask = (todolistId: string, title: string) => async (dispatch: ThunkDispatch) => {
    try {
        dispatch(setAppStatus('loading'));
        const res = await todolistsApi.createTask(todolistId, title);
        if (res.data.resultCode === ResultCode.SUCCESS) {
            const newTask = res.data.data.item;
            dispatch(addTaskAC(newTask));
            dispatch(setAppStatus('succeeded'));
        } else {
            handleServerAppError<CreateUpdateTaskDataType>(dispatch, res.data);
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error);
    }

};

export const updateTask = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    async (dispatch: ThunkDispatch, getState: () => AppStateType) => {
        try {
            dispatch(setAppStatus('loading'));
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
                    dispatch(setAppStatus('succeeded'));
                    dispatch(updateTaskAC(todolistId, taskId, domainModel));
                } else {
                    handleServerAppError<CreateUpdateTaskDataType>(dispatch, res.data);
                }
            }
        } catch (error) {
            handleServerNetworkError(dispatch, error);
        }
    };

//TYPES
type ThunkDispatch = Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType>

type ActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasks>
    | ReturnType<typeof updateTaskAC>
| ClearTodolistsActionType

export type TasksStateType = {
    [key: string]: Array<TaskType>
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