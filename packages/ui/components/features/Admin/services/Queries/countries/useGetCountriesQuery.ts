import { Country, Exact, Scalars } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetCountriesQueryVariables = Exact<{
  name: Scalars["String"];
}>;

export type GetCountriesQuery = { __typename?: "Query" } & {
  getCountries: Array<
    { __typename?: "Country" } & Pick<Country, "code" | "name" | "id">
  >;
};

type args = GetCountriesQueryVariables["name"];
export const GetCountriesQueryKey = (args: args) => ["get-countries", { args }];

export const getcountriesQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getCountries($name:String!){
  	getCountries(name:$name){
    code
    name
    id
  }
}
  `);

  const res = await client
    .setVariables<GetCountriesQueryVariables>({
      name: args,
    })
    .send<GetCountriesQuery>();
  return res.data.getCountries;
};

export const useGetCountriesQuery = (name: args) =>
  useQuery(GetCountriesQueryKey(name), () => getcountriesQueryFetcher(name));
