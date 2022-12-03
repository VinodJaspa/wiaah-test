import { UseMutationOptions } from "react-query";

export type mutationOptions<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
> = Omit<
  UseMutationOptions<TData, TError, TVariables, TContext>,
  "mutationKey" | "mutationFn"
>;
