import {
  Exact,
  GetProfileStatisticsInput,
  ProfileOverviewStatistics,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetProfileOverviewStatsQueryVariables = Exact<{
  args: GetProfileStatisticsInput;
}>;

export type GetProfileOverviewStatsQuery = { __typename?: "Query" } & {
  getProfileOverviewStatistics: {
    __typename?: "ProfileOverviewStatistics";
  } & Pick<ProfileOverviewStatistics, "activity" | "engaged" | "reached">;
};

type args = GetProfileOverviewStatsQueryVariables["args"];
export const getProfileOverviewStatisticsQueryKey = (args: args) => [
  "get-profile-overview-statistics",
  { args },
];

export const getProfieOverviewStatisticsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getProfileOverviewStats(
  $args:GetProfileStatisticsInput!
){
  getProfileOverviewStatistics(args:$args){
    activity
    engaged
    reached
  }
}
    `);

  const res = await client
    .setVariables<GetProfileOverviewStatsQueryVariables>({
      args,
    })
    .send<GetProfileOverviewStatsQuery>();

  return res.data.getProfileOverviewStatistics;
};

export const useGetProfileOverviewStatisticsQuery = (args: args) =>
  useQuery(getProfileOverviewStatisticsQueryKey(args), () =>
    getProfieOverviewStatisticsQueryFetcher(args)
  );
