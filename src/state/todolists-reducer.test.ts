import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';

test('correct todolist should be removed', () => {
    let toDoListId1 = v1();
    let toDoListId2 = v1();

    const startState: Array<TodolistType> = [
        {id: toDoListId1, title: 'What to learn', filter: 'ALL'},
        {id: toDoListId2, title: 'What to buy', filter: 'ALL'}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(toDoListId1));

    expect(startState).not.toBe(endState);
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(toDoListId2);
});

test('correct todolist should be added', () => {
    let toDoListId1 = v1();
    let toDoListId2 = v1();

    const newTodolist = 'New todolist'

    const startState: Array<TodolistType> = [
        {id: toDoListId1, title: 'What to learn', filter: 'ALL'},
        {id: toDoListId2, title: 'What to buy', filter: 'ALL'}
    ]

    const endState = todolistsReducer(startState, addTodolistAC(newTodolist));

    expect(startState).not.toBe(endState);
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolist);
    expect(endState[0].filter).toBe('ALL');
});

test('correct todolist should change its title', () => {
    let toDoListId1 = v1();
    let toDoListId2 = v1();

    const newTitle = 'New todolist'

    const startState: Array<TodolistType> = [
        {id: toDoListId1, title: 'What to learn', filter: 'ALL'},
        {id: toDoListId2, title: 'What to buy', filter: 'ALL'}
    ]

    const endState = todolistsReducer(startState, changeTodolistTitleAC(toDoListId1, newTitle));

    expect(startState).not.toBe(endState);
    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe(newTitle);
    expect(endState[1].title).toBe('What to buy');
});

test('correct filter should be changed', () => {
    let toDoListId1 = v1();
    let toDoListId2 = v1();

    const newFilter: FilterValuesType = 'COMPLETED'

    const startState: Array<TodolistType> = [
        {id: toDoListId1, title: 'What to learn', filter: 'ALL'},
        {id: toDoListId2, title: 'What to buy', filter: 'ALL'}
    ]

    const endState = todolistsReducer(startState, changeTodolistFilterAC(toDoListId1, newFilter));

    expect(startState).not.toBe(endState);
    expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe(newFilter);
    expect(endState[1].filter).toBe('ALL');
})