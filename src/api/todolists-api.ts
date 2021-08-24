import {instance, ResponseType} from './api';

export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number,
};

type CreateTodolistDataType = {
    item: TodolistType,
};

type CreateTaskDataType = {
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
};

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
};

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
    startDate: string,
    deadline: string,
};

export const todolistsApi = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('/todo-lists')
            .then(res => res.data)
            .catch((err) => console.warn(`TodolistApi get Todolists ${err}`));
    },
    createTodolist(title: string) {
        const payload = {
            title,
        }
        return instance.post<ResponseType<CreateTodolistDataType>>('/todo-lists', payload)
            .then(res => res.data)
            .catch((err) => console.warn(`TodolistApi create Todolist ${err}`));
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
            .then(res => res.data)
            .catch((err) => console.warn(`TodolistApi delete Todolist ${err}`));
    },
    updateTodolist(todolistId: string, title: string) {
        const payload = {
            title,
        }
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, payload)
            .then(res => res.data)
            .catch((err) => console.warn(`TodolistApi update Todolist ${err}`));
    },
    reorderTodolist(todolistId: string, putAfterItemId: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}/reorder`, putAfterItemId)
            .then(res => res.data)
            .catch((err) => console.warn(`TodolistApi reorder Todolist ${err}`));
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
            .then(res => res.data)
            .catch((err) => console.warn(`TodolistApi get Tasks ${err}`));
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
            .then(res => res.data)
            .catch((err) => console.warn(`TodolistApi delete Tasks ${err}`));
    },
    createTask(todolistId: string, title: string) {
        const payload = {
            title,
        }
        return instance.post<ResponseType<CreateTaskDataType>>(`/todo-lists/${todolistId}/tasks`, payload)
            .then(res => res.data)
            .catch((err) => console.warn(`TodolistApi create Tasks ${err}`));
    },
    updateTask(todolistId: string, taskId: string, payload: UpdateTaskType) {
        return instance.put<ResponseType<CreateTaskDataType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, payload)
            .then(res => res.data)
            .catch((err) => console.warn(`TodolistApi update Tasks ${err}`));
    },
    reorderTask(todolistId: string, taskId: string, putAfterItemId: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}/reorder`, putAfterItemId)
            .then(res => res.data)
            .catch((err) => console.warn(`TodolistApi reorder Tasks ${err}`));
    },
};