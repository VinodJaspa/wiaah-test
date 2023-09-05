import { createGraphqlRequestClient } from "api";
import {
  Account,
  Balance,
  GetFilteredSellersAccountsInput,
  Location,
  Maybe,
  Membership,
  Profile,
} from "@features/API";
import { Exact } from "types";
import { useQuery } from "react-query";

export type GetFilteredSellersQueryVariables = Exact<{
  args: GetFilteredSellersAccountsInput;
}>;
export type GetFilteredSellersQuery = { __typename?: "Query" } & {
  getFilteredSellers: Array<
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

export const useGetFilteredSellers = (
  input: GetFilteredSellersAccountsInput
) => {
  const client = createGraphqlRequestClient();
  client.setQuery(`
query getFilteredSellers(
    $args:GetFilteredSellersAccountsInput!
){
    getFilteredSellers(
        getSellersInput:$args
    ){        
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
    		ips
    		profile{
          visits
        }
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

  client.setVariables<GetFilteredSellersQueryVariables>({
    args: input,
  });
  return useQuery(["get-filtered-sellers", { input }], async () => {
    const res = await client.send<GetFilteredSellersQuery>();
    console.log({ res });
    return res.data.getFilteredSellers;
  });
};
