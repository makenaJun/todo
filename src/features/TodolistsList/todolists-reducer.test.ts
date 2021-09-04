import {
    addTodolistAC,
    changeTodolistFilterAC, setTodoListsEntityStatus,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, setTodoLists,
    todolistsReducer, ToDoListsStateType
} from './todolists-reducer';
import {v1} from 'uuid';
import {TodolistType} from '../../api/todolists-api';
import {RequestStatusType} from '../../app/app-reducer';


let toDoListId1: string;
let toDoListId2: string;
let startState: ToDoListsStateType;

beforeEach(() => {
    toDoListId1 = v1();
    toDoListId2 = v1();

    startState = [
        {id: toDoListId1, title: 'What to learn', filter: 'ALL', order: 0, addedDate: '', entityStatus: 'idle'},
        {id: toDoListId2, title: 'What to buy', filter: 'ALL', order: 0, addedDate: '', entityStatus: 'idle'},
    ];
});


describe('toDo Lists', () => {
    it('correct todolist should be removed', () => {
        const endState = todolistsReducer(startState, removeTodolistAC(toDoListId1));

        expect(startState).not.toBe(endState);
        expect(endState.length).toBe(1);
        expect(endState[0].id).toBe(toDoListId2);
    });

    it('correct todolist should be added', () => {
        const newTodolist = {id: 'toDoListId3', title: 'New todolist', filter: 'ALL', order: 0, addedDate: ''}

        const endState = todolistsReducer(startState, addTodolistAC(newTodolist));

        expect(startState).not.toBe(endState);
        expect(endState.length).toBe(3);
        expect(endState[0].title).toBe(newTodolist.title);
        expect(endState[0].filter).toBe('ALL');
    });

    it('correct todolist should change its title', () => {
        const newTitle = 'New todolist';

        const endState = todolistsReducer(startState, changeTodolistTitleAC(toDoListId1, newTitle));

        expect(startState).not.toBe(endState);
        expect(endState.length).toBe(2);
        expect(endState[0].title).toBe(newTitle);
        expect(endState[1].title).toBe('What to buy');
    });

    it('correct filter should be changed', () => {
        const newFilter: FilterValuesType = 'COMPLETED';

        const endState = todolistsReducer(startState, changeTodolistFilterAC(toDoListId1, newFilter));

        expect(startState).not.toBe(endState);
        expect(endState.length).toBe(2);
        expect(endState[0].filter).toBe(newFilter);
        expect(endState[1].filter).toBe('ALL');
    });

    it('todolists should be set to the state', () => {
        startState = [];

        const todolists: Array<TodolistType> = [
            {id: 'TodolistId1', order: 0, addedDate: '', title: 'What to buy'},
            {id: 'TodolistId2', order: 1, addedDate: '', title: 'What to learn'}
        ];

        const endState = todolistsReducer(startState, setTodoLists(todolists));

        expect(startState).not.toBe(endState);
        expect(endState.length).toBe(2);
        expect(endState[0].title).toBe('What to buy');
        expect(endState[0].filter).toBe('ALL');
        expect(endState[1].title).toBe('What to learn');
    });
    it('entity status of todolist should be changed', () => {
        const newStatus: RequestStatusType = 'loading'

        const endState = todolistsReducer(startState, setTodoListsEntityStatus(toDoListId1, newStatus));

        expect(startState).not.toBe(endState);
        expect(endState[0].entityStatus).toBe(newStatus);
        expect(endState[1].entityStatus).toBe('idle');
    });
});