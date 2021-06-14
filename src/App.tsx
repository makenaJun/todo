import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'ALL' | 'ACTIVE' | 'COMPLETED';

const App = () => {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false}
    ]);

    const [filter, setFilter] = useState<FilterValuesType>('ALL');

    const deleteTask = (taskId: string) => {
        const result = tasks.filter(t => t.id !== taskId);
        setTasks(result);
    }
    const addTask = (newTaskTitle: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        const newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    const changeStatus = (taskId: string, isDone: boolean) => {
        const copyTasks = [...tasks];
        const task = copyTasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone
        }
        setTasks(copyTasks)
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter);
    }

    let tasksFoTodolist;
    switch (filter) {
        case 'ALL':
            tasksFoTodolist = tasks;
            break;
        case 'ACTIVE':
            tasksFoTodolist = tasks.filter(t => !t.isDone);
            break;
        case 'COMPLETED':
            tasksFoTodolist = tasks.filter(t => t.isDone);
            break;
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      changeTaskStatus={changeStatus}
                      tasks={tasksFoTodolist}
                      addTask={addTask}
                      deleteTask={deleteTask}
                      changeFilter={changeFilter}
                      filter={filter}/>
        </div>
    );
}

export default App;
