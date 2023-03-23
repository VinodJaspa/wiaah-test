import {
  Exact,
  GetProfileVisitsDetailsInput,
  ProfileVisitDetails,
} from "@features/API";
import { createGraphqlRequestClient } from "@UI/../api";
import { useQuery } from "react-query";

export type GetProfileVisitsDetailsQueryVariables = Exact<{
  args: GetProfileVisitsDetailsInput;
}>;

export type GetProfileVisitsDetailsQuery = { __typename?: "Query" } & {
  getProfileVisitsDetails: { __typename?: "ProfileVisitsDetails" } & {
    countries: Array<
      { __typename?: "ProfileVisitDetails" } & Pick<
        ProfileVisitDetails,
        "country" | "visits"
      >
    >;
  };
};

type args = GetProfileVisitsDetailsQueryVariables["args"];
export const getProfileVisitsDetailsQueryKey = (args: args) => [
  "get-profile-visits-detaisl",
  { args },
];

export const getProfileVisitsDetailsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

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
