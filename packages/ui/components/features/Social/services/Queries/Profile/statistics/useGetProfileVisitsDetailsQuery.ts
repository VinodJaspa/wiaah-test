import { Exact, GetProfileVisitsDetailsInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import { isDev } from "utils";

export type GetProfileVisitsDetailsQueryVariables = Exact<{
  args: GetProfileVisitsDetailsInput;
}>;

export type GetProfileVisitsDetailsQuery = {
  __typename?: "Query";
  getProfileVisitsDetails: {
    __typename?: "ProfileVisitsDetails";
    countries: Array<{
      __typename?: "ProfileVisitDetails";
      country: string;
      visits: number;
      visitPercent: number;
    }>;
  };
};

type args = GetProfileVisitsDetailsQueryVariables["args"];
export const getProfileVisitsDetailsQueryKey = (args: args) => [
  "get-profile-visits-detaisl",
  { args },
];

export const getProfileVisitsDetailsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  if (isDev) {
    const res: GetProfileVisitsDetailsQuery["getProfileVisitsDetails"] = {
      countries: [
        { country: "USA", visits: 1000, visitPercent: 30 },
        { country: "Canada", visits: 800, visitPercent: 25 },
        { country: "UK", visits: 600, visitPercent: 20 },
        { country: "Australia", visits: 500, visitPercent: 15 },
        { country: "Germany", visits: 400, visitPercent: 10 },
      ],
    };

    return res;
  }

  const res = await client
    .setQuery(
      `
query getProfileVisitsDetails(
  $args:GetProfileVisitsDetailsInput!
){
  getProfileVisitsDetails(args:$args){
    countries{
      country
      visits
      visitPercent
    }
  }
}
    `
    )
    .setVariables<GetProfileVisitsDetailsQueryVariables>({
      args,
    })
    .send<GetProfileVisitsDetailsQuery>();

  return res.data.getProfileVisitsDetails;
};

export const useGetProfileVisitsDetailsQuery = (args: args) =>
  useQuery(getProfileVisitsDetailsQueryKey(args), () =>
    getProfileVisitsDetailsQueryFetcher(args)
  );
