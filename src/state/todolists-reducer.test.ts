import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../App';

let toDoListId1: string;
let toDoListId2: string;
let startState: Array<TodolistType>;

beforeEach(() => {
    toDoListId1 = v1();
    toDoListId2 = v1();

    startState = [
        {id: toDoListId1, title: 'What to learn', filter: 'ALL'},
        {id: toDoListId2, title: 'What to buy', filter: 'ALL'}
    ]
})


describe('toDo Lists', () => {
    it('correct todolist should be removed', () => {

        const endState = todolistsReducer(startState, removeTodolistAC(toDoListId1));

        expect(startState).not.toBe(endState);
        expect(endState.length).toBe(1);
        expect(endState[0].id).toBe(toDoListId2);
    });

    it('correct todolist should be added', () => {
        const newTodolist = 'New todolist'

        const endState = todolistsReducer(startState, addTodolistAC(newTodolist));

        expect(startState).not.toBe(endState);
        expect(endState.length).toBe(3);
        expect(endState[0].title).toBe(newTodolist);
        expect(endState[0].filter).toBe('ALL');
    });

    it('correct todolist should change its title', () => {
        const newTitle = 'New todolist'

        const endState = todolistsReducer(startState, changeTodolistTitleAC(toDoListId1, newTitle));

        expect(startState).not.toBe(endState);
        expect(endState.length).toBe(2);
        expect(endState[0].title).toBe(newTitle);
        expect(endState[1].title).toBe('What to buy');
    });

    it('correct filter should be changed', () => {
        const newFilter: FilterValuesType = 'COMPLETED'

        const endState = todolistsReducer(startState, changeTodolistFilterAC(toDoListId1, newFilter));

        expect(startState).not.toBe(endState);
        expect(endState.length).toBe(2);
        expect(endState[0].filter).toBe(newFilter);
        expect(endState[1].filter).toBe('ALL');
    })
})