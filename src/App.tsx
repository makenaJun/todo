import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'ALL' | 'ACTIVE' | 'COMPLETED';
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

const App = () => {
    let todolistId1 = v1();
    let todolistId2 = v1();


    const [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}
        ],

    })

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {
            id: todolistId1,
            title: 'What to learn',
            filter: 'COMPLETED'
        },
        {
            id: todolistId2,
            title: 'What to buy',
            filter: 'ACTIVE'
        }
    ])
    const deleteTodoList = (todolistId: string) => {
        const filteredTodolists = todolists.filter((tl) => tl.id !== todolistId);
        setTodolists(filteredTodolists);
        delete tasks[todolistId];
        setTasks({...tasks});

    }

    const deleteTask = (taskId: string, todolistId: string) => {
        const copyTasks = tasks[todolistId];
        const filteredTasks = copyTasks.filter(t => t.id !== taskId);
        tasks[todolistId] = filteredTasks;
        setTasks({...tasks});
    }
    const addTask = (newTaskTitle: string, todolistId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        const newTasks = [newTask, ...tasks[todolistId]];
        tasks[todolistId] = newTasks
        setTasks({...tasks});
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        const copyTasks = [...tasks[todolistId]];
        const task = copyTasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone
            tasks[todolistId] = copyTasks;
            setTasks({...tasks})
        }
    }

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        const copyTodolists = [...todolists];
        const todolist = copyTodolists.find((t) => t.id === todolistId);
        if (todolist) {
            todolist.filter = filter
            setTodolists(copyTodolists)
        }
    }


    return (
        <div className="App">

            {todolists.map((todolist) => {
                let tasksFoTodolist;
                switch (todolist.filter) {
                    case 'ALL':
                        tasksFoTodolist = tasks[todolist.id];
                        break;
                    case 'ACTIVE':
                        tasksFoTodolist = tasks[todolist.id].filter(t => !t.isDone);
                        break;
                    case 'COMPLETED':
                        tasksFoTodolist = tasks[todolist.id].filter(t => t.isDone);
                        break;
                }
                return <Todolist key={todolist.id}
                                 id={todolist.id}
                                 title={todolist.title}
                                 deleteTodoList={deleteTodoList}
                                 changeTaskStatus={changeStatus}
                                 tasks={tasksFoTodolist}
                                 addTask={addTask}
                                 deleteTask={deleteTask}
                                 changeFilter={changeFilter}
                                 filter={todolist.filter}/>
            })}

        </div>
    );
}

export default App;
