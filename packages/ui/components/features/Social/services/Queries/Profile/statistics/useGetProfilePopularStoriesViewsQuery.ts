import {
  Exact,
  GetProfilePopularStoriesViewsInput,
  StoryView,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetProfilePopularStoriesViewsQueryVariables = Exact<{
  args: GetProfilePopularStoriesViewsInput;
}>;

export type GetProfilePopularStoriesViewsQuery = { __typename?: "Query" } & {
  getProfilePopularStoriesViews: { __typename?: "StoryView" } & Pick<
    StoryView,
    "createdAt" | "gender" | "id" | "storyId" | "viewerId"
  >;
};

type args = GetProfilePopularStoriesViewsQueryVariables["args"];

export const getProfilePopularStoriesViewsQueryKey = (args: args) => [
  "get-profile-popular-stories-views",
  { args },
];

export const getProfilePopularStoriesViewsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getProfilePopularStoriesViews($args:GetProfilePopularStoriesViewsInput!){
  getProfilePopularStoriesViews(args:$args){
    createdAt
    gender
    id
    storyId
    viewerId
  }
}
    `
    )
    .setVariables<GetProfilePopularStoriesViewsQueryVariables>({
      args,
    })
    .send<GetProfilePopularStoriesViewsQuery>();

  return res.data.getProfilePopularStoriesViews;
};

export const useGetProfilePopularStoriesViewsQuery = (args: args) =>
  useQuery(getProfilePopularStoriesViewsQueryKey(args), () =>
    getProfilePopularStoriesViewsQueryFetcher(args)
  );
