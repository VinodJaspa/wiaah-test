import {
  Exact,
  GetProfileStatisticsInput,
  ProfileReachedAudience,
} from "@features/API";
import { createGraphqlRequestClient } from "@UI/../api";
import { useQuery } from "react-query";

export type GetProfileReachedAudineceQueryVariables = Exact<{
  args: GetProfileStatisticsInput;
}>;

export type GetProfileReachedAudineceQuery = { __typename?: "Query" } & {
  getProfileReachedAudinece: Array<
    { __typename?: "ProfileReachedAudience" } & Pick<
      ProfileReachedAudience,
      "age" | "createdAt" | "gender" | "id" | "profileId" | "reachedByProfileId"
    >
  >;
};

type args = GetProfileReachedAudineceQueryVariables["args"];
export const getProfileReachedAudienceQueryKey = (args: args) => [
  "get-profile-reached-audinece",
  { args },
];

export const getProfileReachedAudienceQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `query getProfileReachedAudinece($args:GetProfileStatisticsInput!){
  getProfileReachedAudinece(args:$args){
    age
    createdAt
    gender
    id
    profileId
    reachedByProfileId
  }
}`
    )
    .setVariables<GetProfileReachedAudineceQueryVariables>({
      args,
    })
    .send<GetProfileReachedAudineceQuery>();

  return res.data.getProfileReachedAudinece;
};

export const useGetProfileReachedAudienceQuery = (args: args) =>
  useQuery(getProfileReachedAudienceQueryKey(args), () =>
    getProfileReachedAudienceQueryFetcher(args)
  );
