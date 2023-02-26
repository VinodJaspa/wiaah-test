import {
  Exact,
  GetTransactionsAdminInput,
  Maybe,
  Membership,
  Profile,
  Transaction,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetFilteredTransactionsQueryVariables = Exact<{
  args: GetTransactionsAdminInput;
}>;

export type AdminGetFilteredTransactionsQuery = { __typename?: "Query" } & {
  adminGetTransations: Array<
    { __typename?: "Transaction" } & Pick<
      Transaction,
      "id" | "createdAt" | "description" | "status" | "amount"
    > & {
        toUser: { __typename?: "Account" } & {
          profile?: Maybe<
            { __typename?: "Profile" } & Pick<Profile, "username">
          >;
          subscribedPlan: { __typename?: "MembershipSubscription" } & {
            membership: { __typename?: "Membership" } & Pick<
              Membership,
              "name"
            >;
          };
        };
      }
  >;
};

type args = AdminGetFilteredTransactionsQueryVariables["args"];
export const adminGetFilteredTransationsQueryKey = (args: args) => [
  "admin-filtered-transations",
  { args },
];

export const adminGetFilteredTransationsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query adminGetFilteredTransactions($args:GetTransactionsAdminInput!){
  adminGetTransations(args:$args){
		id
    toUser {
      profile {
        username
      }
      subscribedPlan{
        membership {
          name
        }
      }
    }
    createdAt
    description
    status
    amount
  }
}
    `);

  const res = await client
    .setVariables<AdminGetFilteredTransactionsQueryVariables>({
      args,
    })
    .send<AdminGetFilteredTransactionsQuery>();

  return res.data.adminGetTransations;
};

export const useAdminGetFilteredTransactionsQuery = (args: args) =>
  useQuery(adminGetFilteredTransationsQueryKey(args), () =>
    adminGetFilteredTransationsQueryFetcher(args)
  );
