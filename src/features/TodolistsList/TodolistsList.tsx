import React, {FC, useCallback, useEffect} from 'react';
import {Grid, Paper} from '@material-ui/core';
import {Todolist} from './Todolist/Todolist';
import {
    changeTodolistFilterAC,
    createTodolist,
    FilterValuesType,
    getTodolists,
    ToDoListsStateType,
    updateTodolistTitle
} from './todolists-reducer';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../app/store';

export const TodolistsList: FC = () => {
    const dispatch = useDispatch();
    const toDoLists = useSelector<AppStateType, ToDoListsStateType>(state => state.toDoLists);

    useEffect(() => {
        dispatch(getTodolists());
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

    return <>
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
                                      changeFilter={changeFilter}
                                      changeToDoListTitle={changeToDoListTitle}
                                      filter={toDoList.filter}/>
                        </Paper>
                    </Grid>)
            })}
        </Grid>
    </>
}