import {setAppError, SetAppErrorActionType, setAppStatus, SetAppStatusActionType} from '../app/app-reducer';
import {ResponseType} from '../api/api';
import {Dispatch} from 'redux';

export const handleServerAppError = <D = {}>(dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>, data: ResponseType<D>) => {
    const message = data.messages.length ? data.messages[0] : 'Some error occurred';
    dispatch(setAppError(message));
    dispatch(setAppStatus('failed'));
}

export const handleServerNetworkError = (dispatch: Dispatch<SetAppErrorActionType | SetAppStatusActionType>, error: { message: string }) => {
    const message = error.message ? error.message : 'Some error occurred';
    dispatch(setAppError(message));
    dispatch(setAppStatus('failed'));
}