import { createGraphqlRequestClient } from "@UI/../api";
import { isDev, randomNum } from "@UI/../utils/src";
import { getRandomImage } from "@UI/placeholder";
import {
  Action,
  Exact,
  GetActionsCursorResponse,
  GetUserActionsInput,
} from "@features/API";
import { UseInfiniteQueryOptions, useInfiniteQuery } from "react-query";

export type GetProfileActionsQueryVariables = Exact<{
  args: GetUserActionsInput;
}>;

export type GetProfileActionsQuery = { __typename?: "Query" } & {
  getUserActions: { __typename?: "GetActionsCursorResponse" } & Pick<
    GetActionsCursorResponse,
    "cursor" | "hasMore"
  > & {
      data: Array<
        { __typename?: "Action" } & Pick<Action, "id" | "cover" | "views">
      >;
    };
};
type args = GetProfileActionsQueryVariables["args"];

export const getProfileActionsQueryKey = (args: args) => [
  "get-profile-actions",
  { args },
];

export const getProfileActionsQueryFetcher = async (args: args) => {
  if (isDev) {
    const mockRes: GetProfileActionsQuery["getUserActions"] = {
      cursor: "",
      hasMore: false,
      data: [...Array(20)].map((_, i) => ({
        id: i.toString(),
        cover: getRandomImage(),
        views: randomNum(15000),
      })),
    };

    return mockRes;
  }

  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query GetProfileActions($args:GetUserActionsInput!){
  getUserActions(args:$args){
    cursor
    data{
      id
      cover
      views
    }
    hasMore
  }
}
  `
    )
    .setVariables<GetProfileActionsQueryVariables>({
      args,
    })
    .send();

  return res.data;
};

export const useGetProfileActionsQuery = (
  args: args,
  options?: UseInfiniteQueryOptions<
    GetProfileActionsQuery["getUserActions"],
    unknown,
    GetProfileActionsQuery["getUserActions"],
    any
  >
) =>
  useInfiniteQuery(
    getProfileActionsQueryKey(args),
    ({ meta, queryKey, pageParam, signal }) => {
      console.log({ meta, queryKey, pageParam, signal });
      return getProfileActionsQueryFetcher(args);
    },
    options
  );
