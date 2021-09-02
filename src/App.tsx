import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from '@material-ui/core/styles';
import {Container, Grid, Paper} from '@material-ui/core';
import {
    changeTodolistFilterAC,
    createTodolist,
    FilterValuesType,
    getTodolists,
    removeTodolistAC,
    ToDoListsStateType,
    updateTodolistTitle
} from './state/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from './state/store';

const App = () => {


    const dispatch = useDispatch();
    const toDoLists = useSelector<AppStateType, ToDoListsStateType>(state => state.toDoLists);

    useEffect(() => {
        dispatch(getTodolists());
    }, [dispatch]);

    const deleteToDoList = useCallback((toDoListId: string) => {
        dispatch(removeTodolistAC(toDoListId));
    }, [dispatch]);

    const changeToDoListTitle = useCallback((toDoListId: string, title: string) => {
        dispatch(updateTodolistTitle(toDoListId, title));
    }, [dispatch]);

    const changeFilter = useCallback((toDoListId: string, filter: FilterValuesType,) => {
        dispatch(changeTodolistFilterAC(toDoListId, filter));
    }, [dispatch]);

    const addToDoList = useCallback((title: string) => {
        dispatch(createTodolist(title));
    }, [dispatch]);

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
                        ToDoLists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed style={{'padding': '20px'}}>
                <Grid container style={{'padding': '0 0 20px 0'}}>
                    <AddItemForm addItem={addToDoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {toDoLists.map((toDoList) => {
                        return (
                            <Grid item key={toDoList.id}>
                                <Paper style={{'padding': '10px'}}>
                                    <Todolist key={toDoList.id}
                                              id={toDoList.id}
                                              title={toDoList.title}
                                              deleteToDoList={deleteToDoList}
                                              changeFilter={changeFilter}
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