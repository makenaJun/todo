import {instance, ResponseType} from './api';

// API
export const authApi = {
    me() {
        return instance.get<ResponseType<AuthMeDataType>>('/auth/me').then(res => res.data);
    },
    login(data: LoginParamsType) {
        return instance.post<ResponseType<LoginDataType>>('/auth/login', data).then(res => res.data);
    },
    logout() {
        return instance.delete<ResponseType>('/auth/login').then(res => res.data);
    },
}

// TYPES

export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string,
}

export type AuthMeDataType = {
    id: number,
    email: string,
    login: string,
};

export type LoginDataType = {
    userId?: number,
};