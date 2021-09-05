import {appReducer, InitialAppStateType, setAppError, setAppIsInitialized, setAppStatus} from './app-reducer';

let startState: InitialAppStateType;

beforeEach(() => {
    startState = {
        status: 'idle',
        error: 'null',
        isInitialized: false,
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
    it('App Initialized should be change', () => {
        const action = setAppIsInitialized(true);

        const endState = appReducer(startState, action);

        expect(startState).not.toBe(endState);
        expect(endState.status).toBeTruthy();
    });
})