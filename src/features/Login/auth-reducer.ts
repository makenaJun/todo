import {Dispatch} from 'redux';
import {SetAppErrorActionType, setAppStatus, SetAppStatusActionType} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {authApi, LoginDataType, LoginParamsType} from '../../api/auth-api';
import {ResultCode} from '../../api/api';

const initialState = {
    isLoggedIn: false,
};


export const authReducer = (state: LoginInitialStateType = initialState, action: ActionsType): LoginInitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN': {
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
            };
        }
        default:
            return state;
    }
};

//ACTIONS

export const setIsLoggedIn = (isLoggedIn: boolean) => {
    return {type: 'login/SET-IS-LOGGED-IN', isLoggedIn} as const
};

// THUNKS

export const login = (data: LoginParamsType) => async (dispatch: ThunkDispatch) => {
    try {
        dispatch(setAppStatus('loading'));
        const res = await authApi.login(data);
        if (res.resultCode === ResultCode.SUCCESS) {
            dispatch(setIsLoggedIn(true));
            dispatch(setAppStatus('succeeded'));
        } else if (res.resultCode === ResultCode.CAPTCHA) {
            console.log('GET-CAPTCHA');
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

export type LoginInitialStateType = typeof initialState;