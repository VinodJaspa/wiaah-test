import { createGraphqlRequestClient } from "@UI/../api";
import { isDev, randomNum } from "@UI/../utils/src";
import { Action, Exact } from "@features/API";
import React from "react";
import { useInfiniteQuery, useQuery } from "react-query";

export type GetSuggestedActionsQueryVariables = Exact<{ [key: string]: never }>;

export type GetSuggestedActionsQuery = { __typename?: "Query" } & {
  getMyRecommendedAction: { __typename?: "Action" } & Pick<
    Action,
    "src" | "reactionNum" | "comments" | "shares" | "id"
  >;
};

type args = GetSuggestedActionsQueryVariables;

export const getPeronalizedActionsQueryKey = () => ["get-personalized-actions"];

export const getPeronalizedActionsQueryFetcher = async () => {
  if (isDev) {
    const mockRes: GetSuggestedActionsQuery["getMyRecommendedAction"] = {
      comments: randomNum(123456),
      reactionNum: randomNum(123456),
      shares: randomNum(123456),
      src: "/action.mp4",
      id: "",
    };

    return mockRes;
  }

  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getSuggestedActions{
  getMyRecommendedAction{
    src
    reactionNum
    comments
    shares
    id
  }
}
  `
    )
    .setVariables<GetSuggestedActionsQueryVariables>({})
    .send<GetSuggestedActionsQuery>();

  return res.data.getMyRecommendedAction;
};

export const useGetPeronalizedActionsQuery = () =>
  useQuery(
    getPeronalizedActionsQueryKey(),
    () => getPeronalizedActionsQueryFetcher(),
    { cacheTime: 0 }
  );
