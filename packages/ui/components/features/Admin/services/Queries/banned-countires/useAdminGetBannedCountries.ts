import {
  BannedCity,
  BannedCountry,
  City,
  Country,
  Exact,
  GetBannedCountriesAdminInput,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetBannedCountriesQueryVariables = Exact<{
  args: GetBannedCountriesAdminInput;
}>;

export type AdminGetBannedCountriesQuery = { __typename?: "Query" } & {
  getBannedCountries: Array<
    { __typename?: "BannedCountry" } & Pick<BannedCountry, "id" | "isoCode"> & {
        cities: Array<
          { __typename?: "BannedCity" } & Pick<BannedCity, "id"> & {
              city: { __typename?: "City" } & Pick<City, "id" | "name">;
            }
        >;
        country: { __typename?: "Country" } & Pick<Country, "name">;
      }
  >;
};

type args = AdminGetBannedCountriesQueryVariables["args"];
export const adminGetBannedCountriesQueryKey = (args: args) => [
  "admin-get-countries",
  { args },
];

export const adminGetBannedCountriesQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query adminGetBannedCountries($args:GetBannedCountriesAdminInput!){
  getBannedCountries(args:$args){
    id
    isoCode
    cities {
      city {
        id
        name
      }
      id
    }
    country {
      name
    }
  }
}
    `);

  const res = await client
    .setVariables<AdminGetBannedCountriesQueryVariables>({ args })
    .send<AdminGetBannedCountriesQuery>();

  return res.data.getBannedCountries;
};

export const useAdminGetBannedCountriesQuery = (args: args) =>
  useQuery(adminGetBannedCountriesQueryKey(args), () =>
    adminGetBannedCountriesQueryFetcher(args)
  );
