import {appReducer, InitialAppStateType, setAppError, setAppStatus} from './app-reducer';

let startState: InitialAppStateType;

beforeEach(() => {
    startState = {
        status: 'idle',
        error: 'null',
    }
})

describe('AppReducer', () => {
    it('error message should be set', () => {
        const action = setAppError('Some error');

        const endState = appReducer(startState, action);

        expect(startState).not.toBe(endState);
        expect(endState.error).toBe(action.error);
    });
    it('status should be change', () => {
        const action = setAppStatus('succeeded');

        const endState = appReducer(startState, action);

        expect(startState).not.toBe(endState);
        expect(endState.status).toBe(action.status);
    });
})