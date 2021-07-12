import {StateType, userReducer} from './user-reducer';


test('user reducer should increment only age ', () => {
    const startState: StateType = {name: 'Dimych', age: 27, childrenCount: 0};
    const endState = userReducer(startState, {type: 'INCREMENT-AGE'});

    expect(startState).not.toBe(endState)
    expect(endState.age).toBe(28)
    expect(endState.childrenCount).toBe(0)
})

test('user reducer should increment only childrenCount ', () => {
    const startState: StateType = {name: 'Dimych', age: 27, childrenCount: 0};
    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'});

    expect(startState).not.toBe(endState)
    expect(endState.childrenCount).toBe(1)
    expect(endState.age).toBe(27)
})

test('user reducer should change name of user', () => {
    const startState: StateType = {name: 'Dimych', age: 27, childrenCount: 0};
    const newName = 'Viktor'
    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: newName});

    expect(endState.name).toBe(newName)
})