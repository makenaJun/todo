import React, {useEffect, useState} from 'react';
import {TaskPriorities, TaskStatuses, todolistsApi, UpdateTaskType} from '../api/todolists-api';


export default {
    title: 'API',
};

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        todolistsApi.getTodolists()
            .then(data => {
                setState(data);
            });
    }, []);

    return (
        <div>
            {JSON.stringify(state)}
        </div>
    )
};

export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null);
    const [title, setTitle] = useState<string>('');

    const createTodoList = () => {
        todolistsApi.createTodolist(title)
            .then(data => {
                setState(data);
            });
    };

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input type="text"
                       value={title}
                       placeholder={'Title'}
                       onChange={(e) => setTitle(e.currentTarget.value)}
                />
                <button onClick={createTodoList}>Create ToDoList</button>
            </div>
        </div>
    )
};

export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');

    const deleteTodolistHandler = () => {
        todolistsApi.deleteTodolist(todolistId)
            .then(data => {
                setState(data);
            });
    };

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input type="text"
                       placeholder={'Todolist ID'}
                       value={todolistId}
                       onChange={(e) => setTodolistId(e.currentTarget.value)}
                />
                <button onClick={deleteTodolistHandler}>Delete todolist</button>
            </div>
        </div>
    )
};

export const UpdateTodoListTitle = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const updateTodolistHandler = () => {
        todolistsApi.updateTodolist(todolistId, title)
            .then(data => {
                setState(data);
            });
    };

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input type="text"
                       placeholder={'Todolist ID'}
                       value={todolistId}
                       onChange={(e) => setTodolistId(e.currentTarget.value)}
                />
                <input type="text"
                       placeholder={'New Title'}
                       value={title}
                       onChange={(e) => setTitle(e.currentTarget.value)}
                />
                <button onClick={updateTodolistHandler}>Update todolist title</button>
            </div>
        </div>
    )
};

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');

    const getTaskHandler = () => {
        todolistsApi.getTasks(todolistId)
            .then(data => {
                setState(data);
            });
    };

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input type="text"
                       placeholder={'Todolist ID'}
                       value={todolistId}
                       onChange={(e) => setTodolistId(e.currentTarget.value)}
                />
                <button onClick={getTaskHandler}>Get Task</button>
            </div>
        </div>
    )
};

export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');

    const deleteTaskHandler = () => {
        todolistsApi.deleteTask(todolistId, taskId)
            .then(data => {
                setState(data);
            });
    };

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input type="text"
                       placeholder={'Todolist ID'}
                       value={todolistId}
                       onChange={(e) => setTodolistId(e.currentTarget.value)}
                />
                <input type="text"
                       placeholder={'Task ID'}
                       value={taskId}
                       onChange={(e) => setTaskId(e.currentTarget.value)}
                />
                <button onClick={deleteTaskHandler}>Delete task</button>
            </div>
        </div>
    )
};

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [todolistId, setTodolistId] = useState<string>('');

    const createTaskHandler = () => {
        todolistsApi.createTask(todolistId, taskTitle)
            .then(data => {
                setState(data);
            });
    };

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input type="text"
                       placeholder={'ToDoListID'}
                       value={todolistId}
                       onChange={(e) => setTodolistId(e.currentTarget.value)}/>

                <input type="text"
                       placeholder={'Task Title'}
                       value={taskTitle}
                       onChange={(e) => setTaskTitle(e.currentTarget.value)}/>
                <button onClick={createTaskHandler}>Create Task</button>
            </div>
        </div>
    )
};

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [priority, setPriority] = useState<TaskPriorities>(TaskPriorities.Low);
    const [status, setStatus] = useState<TaskStatuses>(TaskStatuses.Completed);

    const updateTaskTitle = () => {
        const payload: UpdateTaskType = {
            title: title,
            completed: true,
            deadline: '2021-08-19T13:12:11.577',
            description: description,
            priority: priority,
            startDate: '2021-08-19T13:12:11.577',
            status: status,
        };

        todolistsApi.updateTask(todolistId, taskId, payload)
            .then(data => {
                setState(data);
            });
    };

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input type="text"
                       placeholder={'Todolist ID'}
                       value={todolistId}
                       onChange={(e) => setTodolistId(e.currentTarget.value)}
                />
                <input type="text"
                       placeholder={'Task ID'}
                       value={taskId}
                       onChange={(e) => setTaskId(e.currentTarget.value)}
                />
                <input type="text"
                       placeholder={'Title'}
                       value={title}
                       onChange={(e) => setTitle(e.currentTarget.value)}
                />
                <input type="text"
                       placeholder={'Description'}
                       value={description}
                       onChange={(e) => setDescription(e.currentTarget.value)}
                />
                <input type="number"
                       placeholder={'Priority'}
                       value={priority}
                       onChange={(e) => setPriority(+e.currentTarget.value)}
                />
                <input type="number"
                       placeholder={'Status'}
                       value={status}
                       onChange={(e) => setStatus(+e.currentTarget.value)}
                />
                <button onClick={updateTaskTitle}>Update task</button>
            </div>
        </div>
    )
};

export const TaskReorder = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');
    const [itemId, setItemId] = useState<string>('');


    const reorderTaskHandler = () => {
        todolistsApi.reorderTask(todolistId, taskId, itemId)
            .then(data => {
                setState(data);
            });
    };

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input type="text"
                       placeholder={'Todolist ID'}
                       value={todolistId}
                       onChange={(e) => setTodolistId(e.currentTarget.value)}
                />
                <input type="text"
                       placeholder={'Task ID'}
                       value={taskId}
                       onChange={(e) => setTaskId(e.currentTarget.value)}
                />
                <input type="text"
                       placeholder={'Put After Item Id'}
                       value={itemId}
                       onChange={(e) => setItemId(e.currentTarget.value)}
                />
                <button onClick={reorderTaskHandler}>Update task</button>
            </div>
        </div>
    )
};

export const TodolistReorder = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [itemId, setItemId] = useState<string>('');

    const reorderTodolistHandler = () => {
        todolistsApi.reorderTodolist(todolistId, itemId)
            .then(data => {
                setState(data);
            });
    };

    return (
        <div>
            {JSON.stringify(state)}
            <div>
                <input type="text"
                       placeholder={'Todolist ID'}
                       value={todolistId}
                       onChange={(e) => setTodolistId(e.currentTarget.value)}
                />
                <input type="text"
                       placeholder={'Put After Item Id'}
                       value={itemId}
                       onChange={(e) => setItemId(e.currentTarget.value)}
                />
                <button onClick={reorderTodolistHandler}>Update task</button>
            </div>
        </div>
    )
};


