import {instance, ResponseType} from './api';

// API

export const todolistsApi = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('/todo-lists');
    },
    createTodolist(title: string) {
        const payload = {
            title,
        }
        return instance.post<ResponseType<CreateTodolistDataType>>('/todo-lists', payload);
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`);
    },
    updateTodolist(todolistId: string, title: string) {
        const payload = {
            title,
        }
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, payload);
    },
    reorderTodolist(todolistId: string, putAfterItemId: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}/reorder`, putAfterItemId);
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`);
    },
    createTask(todolistId: string, title: string) {
        const payload = {
            title,
        }
        return instance.post<ResponseType<CreateUpdateTaskDataType>>(`/todo-lists/${todolistId}/tasks`, payload);
    },
    updateTask(todolistId: string, taskId: string, payload: UpdateTaskType) {
        return instance.put<ResponseType<CreateUpdateTaskDataType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, payload);
    },
    reorderTask(todolistId: string, taskId: string, putAfterItemId: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}/reorder`, putAfterItemId);
    },
};

// TYPES

export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number,
};

export type CreateTodolistDataType = {
    item: TodolistType,
};

export type CreateUpdateTaskDataType = {
    item: TaskType,
};

type GetTasksResponseType = {
    items: Array<TaskType>,
    totalCount: number,
    error: string | null,
};

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

export type TaskType = {
    description: string,
    title: string,
    completed: boolean,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string,
};

export type UpdateTaskType = {
    title: string,
    description: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: string | null,
    deadline: string | null,
};