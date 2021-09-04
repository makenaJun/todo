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

type PropsType = {
    demo?: boolean,
}

export const TodolistsList: FC<PropsType> = (props) => {
    const {demo = false} = props;

    const dispatch = useDispatch();
    const toDoLists = useSelector<AppStateType, ToDoListsStateType>(state => state.toDoLists);

    useEffect(() => {
        if (demo) {
            return;
        }
        dispatch(getTodolists());
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
                                      todolist={toDoList}
                                      demo={demo}
                            />
                        </Paper>
                    </Grid>)
            })}
        </Grid>
    </>
}