import { createGraphqlRequestClient } from "api";
import { Account, GetFilteredSellersAccountsInput } from "@features/API";
import { Exact } from "types";
import { useQuery } from "react-query";

type GetFilteredSellersQueryVariables = Exact<{
  args: GetFilteredSellersAccountsInput;
}>;

type GetFilteredSellersQuery = { __typename?: "Query" } & {
  getFilteredSellers: Array<
    { __typename?: "Account" } & Pick<
      Account,
      | "createdAt"
      | "email"
      | "firstName"
      | "id"
      | "lastName"
      | "photo"
      | "type"
      | "verified"
    >
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
            type
            verified

        }
    }
    `);

  client.setVariables<GetFilteredSellersQueryVariables>({
    args: input,
  });
  return useQuery(["get-filtered-sellers", { input }], async () => {
    const res = await client.send<GetFilteredSellersQuery>();
    return res.data.getFilteredSellers;
  });
};
