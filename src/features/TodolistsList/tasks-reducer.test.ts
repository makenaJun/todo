import {v1} from 'uuid';
import {addTaskAC, removeTaskAC, setTasks, tasksReducer, TasksStateType, updateTaskAC} from './tasks-reducer';
import {addTodolistAC, clearTodolistsData, removeTodolistAC, setTodoLists} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from '../../api/todolists-api';


let toDoListId1: string;
let toDoListId2: string;

let taskId1: string;
let taskId2: string;
let taskId3: string;

let startState: TasksStateType;

beforeEach(() => {
    toDoListId1 = v1();
    toDoListId2 = v1();

    taskId1 = v1();
    taskId2 = v1();
    taskId3 = v1();

    startState = {
        [toDoListId1]: [
            {
                id: taskId1, title: 'HTML&CSS', status: TaskStatuses.Completed, completed: false,
                addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
                deadline: '', description: '', todoListId: toDoListId1
            },
            {
                id: taskId2, title: 'JS', status: TaskStatuses.Completed, completed: false,
                addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
                deadline: '', description: '', todoListId: toDoListId1
            },
            {
                id: taskId3, title: 'ReactJS', status: TaskStatuses.New, completed: false,
                addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
                deadline: '', description: '', todoListId: toDoListId1
            }
        ],
        [toDoListId2]: [
            {
                id: v1(), title: 'Meat', status: TaskStatuses.Completed, completed: false,
                addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
                deadline: '', description: '', todoListId: toDoListId2
            },
            {
                id: v1(), title: 'Pencil', status: TaskStatuses.Completed, completed: false,
                addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
                deadline: '', description: '', todoListId: toDoListId2
            },
            {
                id: v1(), title: 'Bread', status: TaskStatuses.New, completed: false,
                addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
                deadline: '', description: '', todoListId: toDoListId2
            },
            {
                id: v1(), title: 'Milk', status: TaskStatuses.New, completed: false,
                addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
                deadline: '', description: '', todoListId: toDoListId2
            }
        ],
    };

});

describe('Tasks', () => {
    it('correct task should be removed', () => {
        const action = removeTaskAC(toDoListId1, taskId1);

        const endState = tasksReducer(startState, action);

        expect(startState).not.toBe(endState);
        expect(endState[toDoListId1].length).toBe(2);
        expect(startState[toDoListId2].length).toBe(4);
        expect(endState[toDoListId1][0].id).toBe(taskId2);
        expect(endState[toDoListId1].every(t => t.id !== taskId1)).toBeTruthy();
    });

    it('correct task should be added', () => {
        const newTask: TaskType = {
            id: v1(),
            title: 'New task',
            status: TaskStatuses.New,
            completed: false,
            addedDate: '',
            order: 0,
            startDate: '',
            priority: TaskPriorities.Low,
            deadline: '',
            description: '',
            todoListId: toDoListId1,
        }

        const action = addTaskAC(newTask);

        const endState = tasksReducer(startState, action);

        expect(startState).not.toBe(endState);
        expect(endState[toDoListId1].length).toBe(4);
        expect(endState[toDoListId2].length).toBe(4);
        expect(endState[toDoListId1][0].id).toBeDefined();
        expect(endState[toDoListId1][0].title).toBe('New task');
        expect(endState[toDoListId1][0].status).toBe(TaskStatuses.New);
    });

    it('correct task should change its title', () => {
        const action = updateTaskAC(toDoListId1, taskId1, {title: 'HTML and CSS'});

        const endState = tasksReducer(startState, action);

        expect(startState).not.toBe(endState);
        expect(endState[toDoListId1].length).toBe(3);
        expect(endState[toDoListId1][0].title).toBe('HTML and CSS');
        expect(endState[toDoListId1][1].title).toBe('JS');
        expect(endState[toDoListId1][2].title).toBe('ReactJS');
    });

    it('correct status should be changed', () => {
        const action = updateTaskAC(toDoListId1, taskId2, {status: TaskStatuses.New});

        const endState = tasksReducer(startState, action);

        expect(startState).not.toBe(endState);
        expect(startState[toDoListId1][1]).not.toBe(endState[toDoListId1][1]);
        expect(endState[toDoListId1].length).toBe(3);
        expect(endState[toDoListId1][1].title).toBe('JS');
        expect(startState[toDoListId1][1].status).toBe(TaskStatuses.Completed);
        expect(endState[toDoListId1][1].status).toBe(TaskStatuses.New);
    });

    it('new array should be added when new todolist is added', () => {
        const newTodolist = {id: 'toDoListId1', title: 'title no matter', filter: 'ALL', order: 0, addedDate: ''}

        const endState = tasksReducer(startState, addTodolistAC(newTodolist));

        const keys = Object.keys(endState);
        const newKey = keys.find(k => k != toDoListId1 && k != toDoListId2);
        if (!newKey) {
            throw new Error('new key should be added');
        }

        expect(startState).not.toBe(endState);
        expect(keys.length).toBe(3);
        expect(endState[newKey]).toStrictEqual([]);
    });

    it('property with todolistId should be deleted', () => {

        const action = removeTodolistAC(toDoListId1);
        const endState = tasksReducer(startState, action);

        const keys = Object.keys(endState);

        expect(startState).not.toBe(endState);
        expect(keys.length).toBe(1);
        expect(endState[toDoListId1]).toBeUndefined();
    });

    it('empty arrays should be added when we set todolists', () => {

        const todolists = [
            {id: 'toDoListId1', title: 'What to learn', order: 0, addedDate: ''},
            {id: 'toDoListId2', title: 'What to buy', order: 0, addedDate: ''},
        ]

        const action = setTodoLists(todolists);
        const endState = tasksReducer(startState, action);

        const keys = Object.keys(endState);

        expect(startState).not.toBe(endState);
        expect(keys.length).toBe(4);
        expect(endState['toDoListId1']).toBeDefined();
        expect(endState['toDoListId2']).toBeDefined();
    });

    it('tasks should be added for todolist', () => {

        const tasks: Array<TaskType> = [
            {
                id: v1(), title: 'Meat', status: TaskStatuses.New, completed: false,
                addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
                deadline: '', description: '', todoListId: 'toDoListId2'
            },
            {
                id: v1(), title: 'Pencil', status: TaskStatuses.New, completed: false,
                addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
                deadline: '', description: '', todoListId: 'toDoListId2'
            }
        ]

        const action = setTasks('toDoListId2', tasks);
        const endState = tasksReducer({
            'toDoListId1': [],
            'toDoListId2': []
        }, action);

        expect(startState).not.toBe(endState);
        expect(endState['toDoListId2'].length).toBe(2);
        expect(endState['toDoListId1'].length).toBe(0);
    });
    it('tasks should be added for todolist', () => {

        const action = clearTodolistsData();
        const endState = tasksReducer({
            'toDoListId1': [],
            'toDoListId2': []
        }, action);

        const keys = Object.keys(endState);

        expect(startState).not.toBe(endState);
        expect(keys.length).toBe(0);
    });
});
