import {
  BannedCity,
  BannedCountry,
  City,
  Country,
  Exact,
  GetBannedCountriesAdminInput,
  Scalars,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetBannedCountryQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type AdminGetBannedCountryQuery = { __typename?: "Query" } & {
  adminGetBannedCountry: { __typename?: "BannedCountry" } & Pick<
    BannedCountry,
    "id" | "isoCode"
  > & {
      cities: Array<
        { __typename?: "BannedCity" } & Pick<
          BannedCity,
          "bannedFor" | "cityId" | "id"
        > & { city: { __typename?: "City" } & Pick<City, "name" | "code"> }
      >;
      country: { __typename?: "Country" } & Pick<Country, "code">;
    };
};

type args = AdminGetBannedCountryQueryVariables["id"];
export const adminGetBannedCountryQueryKey = (args: args) => [
  "admin-get-countries",
  { args },
];

export const adminGetBannedCountryQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query adminGetBannedCountry($id:String!){
  adminGetBannedCountry(id:$id){
    id
    cities {
      bannedFor
      city {
        name
        code
      }
      cityId
      id
    }
    country {
      code
    }
    isoCode
  }
}
    `);

  const res = await client
    .setVariables<AdminGetBannedCountryQueryVariables>({ id: args })
    .send<AdminGetBannedCountryQuery>();

  return res.data.adminGetBannedCountry;
};

export const useAdminGetBannedCountryQuery = (args: args, enabled?: boolean) =>
  useQuery(
    adminGetBannedCountryQueryKey(args),
    () => adminGetBannedCountryQueryFetcher(args),
    { enabled }
  );
