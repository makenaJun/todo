import {tasksReducer} from './tasks-reducer';
import {TasksStateType, TodolistType} from '../App';
import {addTodolistAC, todolistsReducer} from './todolists-reducer';

describe('Tasks and todoLists', () => {
    it('ids should be equals', () => {
        const startTaskState: TasksStateType = {};
        const startTodoListsState: Array<TodolistType> = [];

        const action = addTodolistAC('New todolist');

        const endTodoListsState = todolistsReducer(startTodoListsState, action);
        const endTasksState = tasksReducer(startTaskState, action);

        const keys = Object.keys(endTasksState);
        const idFromTasks = keys[0];
        const idFromTodoLists = endTodoListsState[0].id

        expect(idFromTasks).toBe(action.todoListId)
        expect(idFromTodoLists).toBe(action.todoListId)
    });

    // it('property with todolistId should be deleted', () => {
    //     const startTaskState: TasksStateType = {
    //
    //     };
    //     const startTodoListsState: Array<TodolistType> = [];
    //
    //     const action = addTodolistAC('New todolist');
    //
    //     const endTodoListsState = todolistsReducer(startTodoListsState, action);
    //     const endTasksState = tasksReducer(startTaskState, action);
    //
    //     const keys = Object.keys(endTasksState);
    //     const idFromTasks = keys[0];
    //     const idFromTodoLists = endTodoListsState[0].id
    //
    //     expect(idFromTasks).toBe(action.todoListId)
    //     expect(idFromTodoLists).toBe(action.todoListId)
    // });
})
