export type Success<T> = { data: T, error: null }
export type Failure<E> = { data: null, error: E | unknown }
export type Result<T, E = Error> = Success<T> | Failure<E>

export type SendSuccessResponse<T> = {
    success: true;
    message: string;
    data: T;
    error: null;
}

export type SendFailureResponse<E> = {
    success: false;
    message: string;
    data: null;
    error: E | unknown;
}

export type SendResponse<SR, FR extends Error> =  SendSuccessResponse<SR> |SendFailureResponse<FR>
