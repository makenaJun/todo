const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
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
    }
    return state;
}

// ACTIONS

export const setAppError = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)


// TYPES

export type InitialAppStateType = typeof initialState;

type ActionsType = SetAppErrorActionType
    | SetAppStatusActionType

export type SetAppErrorActionType = ReturnType<typeof setAppError>
export type SetAppStatusActionType = ReturnType<typeof setAppStatus>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'