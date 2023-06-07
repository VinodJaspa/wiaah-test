import {
  Exact,
  GetProfileStatisticsInput,
  ProfileStatistics,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetProfileStatisticsQueryVariables = Exact<{
  args: GetProfileStatisticsInput;
}>;

export type GetProfileStatisticsQuery = { __typename?: "Query" } & {
  getProfileStatistics: { __typename?: "ProfileStatistics" } & Pick<
    ProfileStatistics,
    | "prev_total_comments"
    | "prev_total_followers"
    | "prev_total_likes"
    | "prev_total_saves"
    | "prev_total_visits"
    | "total_comments"
    | "total_followers"
    | "total_likes"
    | "total_saves"
    | "total_visits"
  >;
};

type args = GetProfileStatisticsQueryVariables["args"];
export const getProfileStatisticsQueryKey = (args: args) => [
  "get-profile-statistics",
  { args },
];

export const getProfileStatisticsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getProfileStatistics($args:GetProfileStatisticsInput!){
  getProfileStatistics(args:$args){
    prev_total_comments
    prev_total_followers
    prev_total_likes
    prev_total_saves
    prev_total_visits
    total_comments
    total_followers
    total_likes
    total_saves
    total_visits
  }
}
  `
    )
    .setVariables<GetProfileStatisticsQueryVariables>({
      args,
    })
    .send<GetProfileStatisticsQuery>();

  return res.data.getProfileStatistics;
};

export const useGetProfileStatisticsQuery = (args: args) =>
  useQuery(getProfileStatisticsQueryKey(args), () =>
    getProfileStatisticsQueryFetcher(args)
  );
