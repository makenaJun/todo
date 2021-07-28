import {tasksReducer, TasksStateType} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC, todolistsReducer, ToDoListsStateType, TodolistType} from './todolists-reducer';


describe('Tasks and todoLists', () => {
    it('ids should be equals', () => {
        const startTaskState: TasksStateType = {};
        const startTodoListsState: ToDoListsStateType = [];

        const action = addTodolistAC('New todolist');

        const endTodoListsState = todolistsReducer(startTodoListsState, action);
        const endTasksState = tasksReducer(startTaskState, action);

        const keys = Object.keys(endTasksState);
        const idFromTasks = keys[0];
        const idFromTodoLists = endTodoListsState[0].id;

        expect(idFromTasks).toBe(action.todoListId);
        expect(idFromTodoLists).toBe(action.todoListId);
    });

    it('property with todolistId should be deleted', () => {
        const startTaskState: TasksStateType = {
            ['toDoListId1']: [
                {id: '1', title: 'HTML&CSS', isDone: true},
                {id: '2', title: 'JS', isDone: true},
                {id: '3', title: 'ReactJS', isDone: false},
            ],
            ['toDoListId2']: [
                {id: '4', title: 'Book', isDone: false},
                {id: '5', title: 'Pen', isDone: false},
            ],
        };
        const startTodoListsState: ToDoListsStateType = [
            {id: 'toDoListId1', title: 'What to learn', filter: 'ALL'},
            {id: 'toDoListId2', title: 'What to buy', filter: 'ALL'},
        ];

        const action = removeTodolistAC('toDoListId1');

        const endTodoListsState = todolistsReducer(startTodoListsState, action);
        const endTasksState = tasksReducer(startTaskState, action);

        const keys = Object.keys(endTasksState);
        const idFromTasks = keys[0];
        const idFromTodoLists = endTodoListsState[0].id;

        expect(idFromTasks).toBe('toDoListId2');
        expect(keys.length).toBe(1);
        expect(endTodoListsState.length).toBe(1);
        expect(idFromTodoLists).toBe('toDoListId2');
    });
})
