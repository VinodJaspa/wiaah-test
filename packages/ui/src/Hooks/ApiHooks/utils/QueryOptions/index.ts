import { UseQueryOptions } from "react-query";

export type queryOptions<
  TQueryFnData = any,
  TError = any,
  TData = any,
  TQueryKey = any
> = Omit<
  UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
  "queryKey" | "queryFn"
>;
