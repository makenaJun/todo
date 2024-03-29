import axios from 'axios';

// API

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        'api-key': '8fe373c6-ac19-4fc4-baf6-f60952b5767c',
    },
});


// TYPES

export enum ResultCode {
    SUCCESS = 0,
    ERROR = 1,
    CAPTCHA = 10,
}

export type ResponseType<D = {}> = {
    data: D,
    resultCode: ResultCode,
    messages: Array<string>,
    fieldsErrors: Array<string>,
};