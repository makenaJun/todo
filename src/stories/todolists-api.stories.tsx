import React, {useEffect, useState} from 'react';
import {todolistsApi, UpdateTaskType} from '../api/todolists-api';


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

export const CreateTodoLists = () => {
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

export const DeleteTodoLists = () => {
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

export const UpdateTodoListsTitle = () => {
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

export const CreateTasks = () => {
    const [state, setState] = useState<any>(null);
    const [taskTitle, setTaskTitle] = useState<string>('');
    const [todolistId, setTodolistId] = useState<string>('');

    const createTodoList = () => {
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
                <button onClick={createTodoList}>Create Task</button>
            </div>
        </div>
    )
};

export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const updateTaskTitle = () => {
        const payload: UpdateTaskType = {
            title: title,
            completed: true,
            deadline: '2021-08-19T13:12:11.577',
            description: '',
            priority: 2,
            startDate: '2021-08-19T13:12:11.577',
            status: 1,
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
                <button onClick={updateTaskTitle}>Update task</button>
            </div>
        </div>
    )
};


