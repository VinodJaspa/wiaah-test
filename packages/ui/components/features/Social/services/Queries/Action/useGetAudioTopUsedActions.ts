import { Exact, GetActionByAudioIdInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { UseInfiniteQueryOptions, useInfiniteQuery } from "react-query";

export type GetAudioTopUsedActionsQueryVariables = Exact<{
  args: GetActionByAudioIdInput;
}>;

export type GetAudioTopUsedActionsQuery = {
  __typename?: "Query";
  getActionByAudioId: {
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

type args = GetAudioTopUsedActionsQueryVariables["args"];

export const getAudioTopUsedActionsQueryKey = (args: args) => [
  "effect-top-used-actions",
  { args },
];

export const getAudioTopUsedActiondQueryFetcher = async (args: args) => {
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
    .setVariables<GetAudioTopUsedActionsQueryVariables>({ args })
    .send<GetAudioTopUsedActionsQuery>();

  return res.data.getActionByAudioId;
};

export const useGetAudioTopUsedActionsQuery = (
  args: args,
  options?: UseInfiniteQueryOptions<
    GetAudioTopUsedActionsQuery["getActionByAudioId"],
    any,
    GetAudioTopUsedActionsQuery["getActionByAudioId"],
    any,
    any
  >
) =>
  useInfiniteQuery(
    getAudioTopUsedActionsQueryKey(args),
    ({ pageParam }) =>
      getAudioTopUsedActiondQueryFetcher({
        ...args,
        cursor: pageParam || args.cursor,
      }),
    options
  );
