import { getPostMentionsFetcher, QueryPaginationInputs } from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";

export const getPostMentionsQueryKey = (...props: Record<string, any>[]) => [
  "PostMentions",
  { ...props },
];

export const useGetPostMentionsQuery = (
  props: { postId: string; postType: string },
  pagination: QueryPaginationInputs,
  options: UseQueryOptions<
    any,
    any,
    AsyncReturnType<typeof getPostMentionsFetcher>,
    any
  >
) => {
  return useQuery(
    getPostMentionsQueryKey(pagination, props),
    () => getPostMentionsFetcher(pagination, props),
    options
  );
};
