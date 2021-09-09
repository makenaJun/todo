import React, {FC, useCallback, useEffect} from 'react';
import {Grid, Paper} from '@material-ui/core';
import {Todolist} from './Todolist/Todolist';
import {createTodolist, getTodolists, ToDoListsStateType} from './todolists-reducer';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from '../../app/store';
import {Redirect} from 'react-router-dom';

type PropsType = {
    demo?: boolean,
}

export const TodolistsList: FC<PropsType> = (props) => {
    const {demo = false} = props;

    const dispatch = useDispatch();
    const toDoLists = useSelector<AppStateType, ToDoListsStateType>(state => state.toDoLists);
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.auth.isLoggedIn);

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        dispatch(getTodolists());
    }, [dispatch, demo, isLoggedIn]);

    const addToDoList = useCallback((title: string) => {
        dispatch(createTodolist(title));
    }, [dispatch]);

    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

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
                                      todolist={toDoList}
                            />
                        </Paper>
                    </Grid>)
            })}
        </Grid>
    </>
}