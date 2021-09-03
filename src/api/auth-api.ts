import {instance, ResponseType} from './api';

// API
export const authApi = {
    me() {
        return instance.get<ResponseType<AuthMeDataType>>('/auth/me').then(res => res.data);
    },
    login(email: string, password: string, rememberMe: boolean, captcha: boolean) {
        const payload = {
            email,
            password,
            rememberMe,
            captcha,
        }
        return instance.post<ResponseType<LoginDataType>>('/auth/login', payload).then(res => res.data);
    },
    logout() {
        return instance.delete<ResponseType>('/auth/login').then(res => res.data);
    },
}

// TYPES

type AuthMeDataType = {
    id: number,
    email: string,
    login: string,
};

type LoginDataType = {
    userId: number,
};