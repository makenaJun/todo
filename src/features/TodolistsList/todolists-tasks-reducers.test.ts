import {tasksReducer, TasksStateType} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC, todolistsReducer, ToDoListsStateType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TodolistType} from '../../api/todolists-api';


describe('Tasks and todoLists', () => {
    it('ids should be equals', () => {
        const startTaskState: TasksStateType = {};
        const startTodoListsState: ToDoListsStateType = [];
        const newTodolist: TodolistType =  {id: 'toDoListId1', title: 'What to learn', order: 0, addedDate: ''}



        const action = addTodolistAC(newTodolist);

        const endTodoListsState = todolistsReducer(startTodoListsState, action);
        const endTasksState = tasksReducer(startTaskState, action);

        const keys = Object.keys(endTasksState);
        const idFromTasks = keys[0];
        const idFromTodoLists = endTodoListsState[0].id;

        expect(idFromTasks).toBe(action.todoList.id);
        expect(idFromTodoLists).toBe(action.todoList.id);
    });

    it('property with todolistId should be deleted', () => {
        const startTaskState: TasksStateType = {
            ['toDoListId1']: [
                {
                    id: '1', title: 'HTML&CSS', status: TaskStatuses.Completed, completed: false,
                    addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
                    deadline: '', description: '', todoListId: 'toDoListId1'
                },
                {
                    id: '2', title: 'JS', status: TaskStatuses.Completed, completed: false,
                    addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
                    deadline: '', description: '', todoListId: 'toDoListId1'
                },
                {
                    id: '3', title: 'ReactJS', status: TaskStatuses.New, completed: false,
                    addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
                    deadline: '', description: '', todoListId: 'toDoListId1'
                },
            ],
            ['toDoListId2']: [
                {
                    id: '4', title: 'Book', status: TaskStatuses.New, completed: false,
                    addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
                    deadline: '', description: '', todoListId: 'toDoListId2'
                },
                {
                    id: '5', title: 'Pen', status: TaskStatuses.New, completed: false,
                    addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
                    deadline: '', description: '', todoListId: 'toDoListId2'
                },
            ],
        };
        const startTodoListsState: ToDoListsStateType = [
            {id: 'toDoListId1', title: 'What to learn', filter: 'ALL', order: 0, addedDate: ''},
            {id: 'toDoListId2', title: 'What to buy', filter: 'ALL', order: 0, addedDate: ''},
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
