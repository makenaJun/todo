import {Dispatch} from 'redux';
import {handleServerNetworkError} from '../utils/error-utils';
import {authApi} from '../api/auth-api';
import {ResultCode} from '../api/api';
import {setIsLoggedIn, setIsLoggedInActionType} from '../features/Login/auth-reducer';

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false,
}

export const appReducer = (state: InitialAppStateType = initialState, action: ActionsType): InitialAppStateType => {
    switch (action.type) {
        case 'APP/SET-ERROR': {
            return {
                ...state,
                error: action.error,
            }
        }
        case 'APP/SET-STATUS': {
            return {
                ...state,
                status: action.status,
            }
        }
        case 'APP/SET-APP-IS-INITIALIZED': {
            return {
                ...state,
                isInitialized: action.isInitialized,
            }
        }
    }
    return state;
}

// ACTIONS

export const setAppError = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const);
export const setAppStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);
export const setAppIsInitialized = (isInitialized: boolean) =>
    ({type: 'APP/SET-APP-IS-INITIALIZED', isInitialized} as const);

// THUNKS
export const initializeApp = () => async (dispatch: Dispatch<ActionsType | setIsLoggedInActionType>) => {
    try {
        const res = await authApi.me();
        if (res.resultCode === ResultCode.SUCCESS) {
            dispatch(setIsLoggedIn(true));
        }
        dispatch(setAppIsInitialized(true));
    } catch (error) {
        handleServerNetworkError(dispatch, error);
    }
}

// TYPES

export type InitialAppStateType = typeof initialState;

type ActionsType = SetAppErrorActionType
    | SetAppStatusActionType
    | ReturnType<typeof setAppIsInitialized>

export type SetAppErrorActionType = ReturnType<typeof setAppError>
export type SetAppStatusActionType = ReturnType<typeof setAppStatus>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'