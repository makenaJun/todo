import {Dispatch} from 'redux';
import {SetAppErrorActionType, setAppStatus, SetAppStatusActionType} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {authApi, LoginDataType, LoginParamsType} from '../../api/auth-api';
import {ResultCode} from '../../api/api';
import {AppStateType} from '../../app/store';
import {ClearTodolistsActionType, clearTodolistsData} from '../TodolistsList/todolists-reducer';

const initialState = {
    isLoggedIn: false,
    captchaUrl: null as null | string,
};


export const authReducer = (state: LoginInitialStateType = initialState, action: ActionsType): LoginInitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN': {
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
            };
        }
        case 'login/SET-CAPTCHA-URL': {
            return {
                ...state,
                captchaUrl: action.captchaUrl,
            }
        }
        default:
            return state;
    }
};

//ACTIONS

export const setIsLoggedIn = (isLoggedIn: boolean) => {
    return {type: 'login/SET-IS-LOGGED-IN', isLoggedIn} as const
};

export const setCaptchaUrl = (captchaUrl: string | null) => {
    return {type: 'login/SET-CAPTCHA-URL', captchaUrl} as const
};

// THUNKS

export const login = (data: LoginParamsType) => async (dispatch: ThunkDispatch, getState: () => AppStateType) => {
    try {
        dispatch(setAppStatus('loading'));
        let requestData = {...data};
        if (data.captcha === '') {
            requestData = {
                email: data.email,
                password: data.password,
                rememberMe: data.rememberMe,
            };
        }
        const res = await authApi.login(requestData);
        if (res.resultCode === ResultCode.SUCCESS) {
            dispatch(setIsLoggedIn(true));

            const captchaUrl = getState().auth.captchaUrl;
            if (!!captchaUrl) {
                dispatch(setCaptchaUrl(null));
            }
        } else if (res.resultCode === ResultCode.CAPTCHA) {
            handleServerAppError<LoginDataType>(dispatch, res);
            const response = await authApi.getCaptcha();
            dispatch(setCaptchaUrl(response.url));
            dispatch(setAppStatus('succeeded'));
        } else {
            handleServerAppError<LoginDataType>(dispatch, res);
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error);
    }
};

export const logout = () => async (dispatch: ThunkDispatch) => {
    try {
        dispatch(setAppStatus('loading'));
        const res = await authApi.logout();
        if (res.resultCode === ResultCode.SUCCESS) {
            dispatch(setIsLoggedIn(false));
            dispatch(setAppStatus('succeeded'));
            dispatch(clearTodolistsData());
        } else {
            handleServerAppError(dispatch, res);
        }
    } catch (error) {
        handleServerNetworkError(dispatch, error);
    }
};

//TYPES
type ThunkDispatch = Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType>

export type setIsLoggedInActionType = ReturnType<typeof setIsLoggedIn>

type ActionsType =
    setIsLoggedInActionType
    | ReturnType<typeof setCaptchaUrl>
    | ClearTodolistsActionType

export type LoginInitialStateType = typeof initialState;