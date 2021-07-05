import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from '@material-ui/core/styles';
import {Container, Grid, Paper} from '@material-ui/core';

export type FilterValuesType = 'ALL' | 'ACTIVE' | 'COMPLETED';
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}

const App = () => {
    let toDoListId1 = v1();
    let toDoListId2 = v1();


    const [tasks, setTasks] = useState<TasksStateType>({
        [toDoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}
        ],
        [toDoListId2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false}
        ],

    });
    const [toDoLists, setToDoLists] = useState<Array<TodolistType>>([
        {id: toDoListId1, title: 'What to learn', filter: 'ALL'},
        {id: toDoListId2, title: 'What to buy', filter: 'ALL'}
    ]);

    const deleteToDoList = (toDoListId: string) => {
        const filteredToDoLists = toDoLists.filter((tl) => tl.id !== toDoListId);
        setToDoLists(filteredToDoLists);
        delete tasks[toDoListId];
        setTasks({...tasks});
    };

    const deleteTask = (taskId: string, toDoListId: string) => {
        tasks[toDoListId] = tasks[toDoListId].filter(t => t.id !== taskId);
        setTasks({...tasks});
    };
    const addTask = (newTaskTitle: string, toDoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        tasks[toDoListId] = [newTask, ...tasks[toDoListId]];
        setTasks({...tasks});
    };
    const changeStatus = (taskId: string, isDone: boolean, toDoListId: string) => {
        const copyTasks = [...tasks[toDoListId]];
        const task = copyTasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone
            tasks[toDoListId] = copyTasks;
            setTasks({...tasks})
        }
    };
    const changeTaskTitle = (title: string, toDoListId: string, taskId: string) => {
        const copyTasks = tasks[toDoListId].map(t => t.id === taskId ? {...t, title: title} : t);
        tasks[toDoListId] = copyTasks;
        setTasks({...tasks})
    };
    const changeToDoListTitle = (title: string, toDoListId: string) => {
        const copyToDoLists = toDoLists.map(tl => tl.id === toDoListId ? {...tl, title: title} : tl);
        setToDoLists(copyToDoLists)
    };

    const changeFilter = (filter: FilterValuesType, toDoListId: string) => {
        const copyToDoLists = [...toDoLists];
        const toDoList = copyToDoLists.find((t) => t.id === toDoListId);
        if (toDoList) {
            toDoList.filter = filter
            setToDoLists(copyToDoLists)
        }
    };

    const addToDoList = (title: string) => {
        const newToDoList: TodolistType = {
            id: v1(),
            filter: 'ALL',
            title: title
        }
        setToDoLists([newToDoList, ...toDoLists])
        setTasks({
            ...tasks,
            [newToDoList.id]: []
        })
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }));
    const classes = useStyles();


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed style={{"padding": "20px"}}>
                <Grid container>
                    <AddItemForm addItem={addToDoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {toDoLists.map((toDoList) => {
                        let tasksFoTodolist;
                        switch (toDoList.filter) {
                            case 'ALL':
                                tasksFoTodolist = tasks[toDoList.id];
                                break;
                            case 'ACTIVE':
                                tasksFoTodolist = tasks[toDoList.id].filter(t => !t.isDone);
                                break;
                            case 'COMPLETED':
                                tasksFoTodolist = tasks[toDoList.id].filter(t => t.isDone);
                                break;
                        }
                        return (
                            <Grid item>
                                <Paper style={{"padding": "10px"}}>
                                <Todolist key={toDoList.id}
                                                 id={toDoList.id}
                                                 title={toDoList.title}
                                                 deleteToDoList={deleteToDoList}
                                                 changeTaskStatus={changeStatus}
                                                 tasks={tasksFoTodolist}
                                                 addTask={addTask}
                                                 deleteTask={deleteTask}
                                                 changeFilter={changeFilter}
                                                 changeTaskTitle={changeTaskTitle}
                                                 changeToDoListTitle={changeToDoListTitle}
                                                 filter={toDoList.filter}/>
                                </Paper>
                            </Grid>)
                    })}
                </Grid>
            </Container>
        </div>
);
}

export default App;