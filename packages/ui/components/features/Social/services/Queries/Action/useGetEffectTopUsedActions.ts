import { Exact, GetActionsByEffectIdInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  useQuery,
} from "react-query";

export type EffectTopUsedActionsQueryVariables = Exact<{
  args: GetActionsByEffectIdInput;
}>;

export type EffectTopUsedActionsQuery = {
  __typename?: "Query";
  getActionByEffectId: {
    __typename?: "GetActionsCursorResponse";
    cursor?: string | null;
    hasMore: boolean;
    nextCursor?: string | null;
    total: number;
    data: Array<{
      __typename?: "Action";
      id: string;
      cover: string;
      reactionNum: number;
    }>;
  };
};

type args = EffectTopUsedActionsQueryVariables["args"];

export const getEffectTopUsedActionsQueryKey = (args: args) => [
  "effect-top-used-actions",
  { args },
];

export const getEffectTopUsedActiondQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `query EffectTopUsedActions($args: GetActionsByEffectIdInput!) {
  getActionByEffectId(args: $args) {
    cursor
    hasMore
    nextCursor
    total
    data {
      id
      cover
      reactionNum
    }
  }
}
`
    )
    .setVariables<EffectTopUsedActionsQueryVariables>({ args })
    .send<EffectTopUsedActionsQuery>();

  return res.data.getActionByEffectId;
};

export const useGetEffectTopUsedActionsQuery = (
  args: args,
  options?: UseInfiniteQueryOptions<
    EffectTopUsedActionsQuery["getActionByEffectId"],
    any,
    EffectTopUsedActionsQuery["getActionByEffectId"],
    any,
    any
  >
) =>
  useInfiniteQuery(
    getEffectTopUsedActionsQueryKey(args),
    ({ pageParam }) =>
      getEffectTopUsedActiondQueryFetcher({
        ...args,
        cursor: pageParam || args.cursor,
      }),
    options
  );
