import {v1} from 'uuid';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType
} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';


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
            {id: taskId1, title: 'HTML&CSS', status: TaskStatuses.Completed, completed: false,
                addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
                deadline: '', description: '', todoListId: toDoListId1},
            {id: taskId2, title: 'JS', status: TaskStatuses.Completed, completed: false,
                addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
                deadline: '', description: '', todoListId: toDoListId1},
            {id: taskId3, title: 'ReactJS', status: TaskStatuses.New, completed: false,
                addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
                deadline: '', description: '', todoListId: toDoListId1}
        ],
        [toDoListId2]: [
            {id: v1(), title: 'Meat',  status: TaskStatuses.Completed, completed: false,
                addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
                deadline: '', description: '', todoListId: toDoListId2},
            {id: v1(), title: 'Pencil',  status: TaskStatuses.Completed, completed: false,
                addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
                deadline: '', description: '', todoListId: toDoListId2},
            {id: v1(), title: 'Bread',  status: TaskStatuses.New, completed: false,
                addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
                deadline: '', description: '', todoListId: toDoListId2},
            {id: v1(), title: 'Milk',  status: TaskStatuses.New, completed: false,
                addedDate: '', order: 0, startDate: '', priority: TaskPriorities.Low,
                deadline: '', description: '', todoListId: toDoListId2}
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
        const action = addTaskAC(toDoListId1, 'New task');

        const endState = tasksReducer(startState, action);

        expect(startState).not.toBe(endState);
        expect(endState[toDoListId1].length).toBe(4);
        expect(endState[toDoListId2].length).toBe(4);
        expect(endState[toDoListId1][0].id).toBeDefined();
        expect(endState[toDoListId1][0].title).toBe('New task');
        expect(endState[toDoListId1][0].status).toBe(TaskStatuses.New);
    });

    it('correct task should change its title', () => {
        const action = changeTaskTitleAC(toDoListId1, taskId1, 'HTML and CSS');

        const endState = tasksReducer(startState, action);

        expect(startState).not.toBe(endState);
        expect(endState[toDoListId1].length).toBe(3);
        expect(endState[toDoListId1][0].title).toBe('HTML and CSS');
        expect(endState[toDoListId1][1].title).toBe('JS');
        expect(endState[toDoListId1][2].title).toBe('ReactJS');
    });

    it('correct status should be changed', () => {
        const action = changeTaskStatusAC(toDoListId1, taskId2, TaskStatuses.New);

        const endState = tasksReducer(startState, action);

        expect(startState).not.toBe(endState);
        expect(startState[toDoListId1][1]).not.toBe(endState[toDoListId1][1]);
        expect(endState[toDoListId1].length).toBe(3);
        expect(endState[toDoListId1][1].title).toBe('JS');
        expect(startState[toDoListId1][1].status).toBe(TaskStatuses.Completed);
        expect(endState[toDoListId1][1].status).toBe(TaskStatuses.New);
    });

    it('new array should be added when new todolist is added', () => {
        const newTodolist = 'title no matter';

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
});
