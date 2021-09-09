import {LoginInitialStateType, authReducer, setIsLoggedIn, setCaptchaUrl} from './auth-reducer';


let startState: LoginInitialStateType;

beforeEach(() => {
    startState = {
        isLoggedIn: false,
        captchaUrl: null,
    }
})


describe('Login reducer', () => {
    it('isLoggedIn should be changed', () => {
        const action = setIsLoggedIn(true);

        const endState = authReducer(startState, action);

        expect(startState).not.toBe(endState);
        expect(endState.isLoggedIn).toBeTruthy();
    });

    it('captcha url should be set', () => {
        const action = setCaptchaUrl('test_captcha_url');

        const endState = authReducer(startState, action);

        expect(startState).not.toBe(endState);
        expect(endState.captchaUrl).toBe(action.captchaUrl);
    });


})
