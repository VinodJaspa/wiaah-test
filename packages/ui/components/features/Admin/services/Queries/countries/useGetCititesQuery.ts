import { City, Exact, GetCititesInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetCountryCititesQueryVariables = Exact<{
  args: GetCititesInput;
}>;

export type GetCountryCititesQuery = { __typename?: "Query" } & {
  getCitites: Array<
    { __typename?: "City" } & Pick<City, "code" | "id" | "name" | "countryId">
  >;
};

type args = GetCountryCititesQueryVariables["args"];
export const GetCititesQueryKey = (args: args) => ["get-citites", { args }];

export const getCititesQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(``);

  const res = await client
    .setVariables<GetCountryCititesQueryVariables>({
      args,
    })
    .send<GetCountryCititesQuery>();

  return res.data.getCitites;
};

export const useGetCountryCititesQuery = (args: args, enabled?: boolean) =>
  useQuery(GetCititesQueryKey(args), () => getCititesQueryFetcher(args), {
    enabled,
  });
