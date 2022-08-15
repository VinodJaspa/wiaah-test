import {
  FormatedSearchableFilter,
  getPostCommentsData,
  getPostCommentsFetcher,
  QueryPaginationInputs,
} from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";

export const getPostCommentsQueryKey = (
  filters: FormatedSearchableFilter,
  pagination: QueryPaginationInputs
) => ["PostComments", { filters, pagination }];
export const useGetPostCommentsQuery = (
  filters: FormatedSearchableFilter,
  pagination: QueryPaginationInputs,
  options?: UseQueryOptions<
    unknown,
    unknown,
    AsyncReturnType<typeof getPostCommentsFetcher>,
    any
  >
) => {
  return useQuery(
    getPostCommentsQueryKey(filters, pagination),
    () => getPostCommentsFetcher(filters, pagination),
    options
  );
};
