export declare type ResponseObj<TData = any, TError = string> = {
    success: false;
    error: TError;
} | {
    success: true;
    data: TData;
};
