export type ResponseObj<TData, TError = string> =
  | {
      success: false;
      error: TError;
    }
  | {
      success: true;
      data: TData;
    };
