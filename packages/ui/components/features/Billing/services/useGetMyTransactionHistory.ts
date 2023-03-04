import {
  Account,
  Exact,
  GetTransactionsInput,
  Maybe,
  Profile,
  Transaction,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetMyTransactionsQueryVariables = Exact<{
  args: GetTransactionsInput;
}>;

export type GetMyTransactionsQuery = { __typename?: "Query" } & {
  getMyTransactions: Array<
    { __typename?: "Transaction" } & Pick<
      Transaction,
      | "amount"
      | "createdAt"
      | "description"
      | "from"
      | "id"
      | "status"
      | "updatedAt"
      | "userId"
      | "currency"
      | "paymentType"
    > & {
        toUser: { __typename?: "Account" } & Pick<Account, "id"> & {
            profile?: Maybe<
              { __typename?: "Profile" } & Pick<Profile, "id" | "username">
            >;
          };
        fromUser: { __typename?: "Account" } & Pick<Account, "id"> & {
            profile?: Maybe<
              { __typename?: "Profile" } & Pick<Profile, "id" | "username">
            >;
          };
      }
  >;
};

export const useGetMyTransactionHistoryQuery = (
  input: GetTransactionsInput
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getMyTransactions(
  	$args:GetTransactionsInput!
){
  getMyTransactions(
    myTransactionsArgs:$args
  ){
    amount
    createdAt
    description
    from
    id
    status
    updatedAt
    userId
    currency
    paymentType
    toUser{
      id
      profile {
        id
        username
      }
    }
    fromUser{
      id
      profile{
        id
        username
      }
    }
  }
}
    `);

  client.setVariables<GetMyTransactionsQueryVariables>({
    args: input,
  });

  return useQuery(["my-transactions-history", { input }], async () => {
    const res = await client.send<GetMyTransactionsQuery>();

    return res.data.getMyTransactions;
  });
};
