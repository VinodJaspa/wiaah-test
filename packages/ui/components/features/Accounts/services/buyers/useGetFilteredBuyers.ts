import {
  Account,
  Balance,
  Exact,
  GetBuyersAccountsInput,
  Location,
  Maybe,
  Membership,
  Profile,
} from "../../../../features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetFilteredBuyersQueryVariables = Exact<{
  args: GetBuyersAccountsInput;
}>;

export type GetFilteredBuyersQuery = { __typename?: "Query" } & {
  getFilteredBuyers: Array<
    { __typename?: "Account" } & Pick<
      Account,
      | "createdAt"
      | "email"
      | "firstName"
      | "id"
      | "lastName"
      | "photo"
      | "verified"
      | "accountType"
      | "status"
      | "ips"
      | "membershipId"
    > & {
      profile?: Maybe<{ __typename?: "Profile" } & Pick<Profile, "visits">>;
      shop: { __typename?: "Shop" } & {
        location: { __typename?: "Location" } & Pick<
          Location,
          "address" | "city" | "country"
        >;
      };
      Membership: { __typename?: "Membership" } & Pick<Membership, "name">;
      balance: { __typename?: "Balance" } & Pick<
        Balance,
        "withdrawableBalance"
      >;
    }
  >;
};

type args = GetFilteredBuyersQueryVariables["args"];

export const GetFilteredBuyersQueryKey = (args: args) => [
  "get-filtered-admin-buyers",
  {},
];

export const GetFilteredBuyersQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getFilteredBuyers($args:GetBuyersAccountsInput!) {
  getFilteredBuyers(
    getBuyersInput:$args
  ) {
        createdAt
        email
        firstName
        id
        lastName
        photo
    		verified
        accountType
        verified
        status
        profile{
        visits
        }
        ips
        shop{
          location {
            address
            city
            country
          }
        }
        membershipId
        Membership {
          name
        }
       
  }
} 
    `);

  client.setVariables<GetFilteredBuyersQueryVariables>({
    args,
  });

  return (await client.send<GetFilteredBuyersQuery>()).data.getFilteredBuyers;
};

export const useGetFilteredBuyers = (args: args) => {
  console.log("get filtered buyers", { args });
  return useQuery(
    GetFilteredBuyersQueryKey(args),
    () => GetFilteredBuyersQueryFetcher(args),
    { enabled: args.name !== "" },
  );
};
