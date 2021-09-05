import {LoginInitialStateType, authReducer, setIsLoggedIn} from './auth-reducer';


let startState: LoginInitialStateType;

beforeEach(() => {
    startState = {
        isLoggedIn: false,
    }
})


describe('Login reducer', () => {
    it('isLoggedIn should be changed', () => {
        const action = setIsLoggedIn(true);

        const endState = authReducer(startState, action);

        expect(startState).not.toBe(endState);
        expect(endState.isLoggedIn).toBeTruthy();
    });


})
