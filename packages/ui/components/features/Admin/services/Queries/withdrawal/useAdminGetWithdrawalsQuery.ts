import {
  Account,
  Exact,
  GetWithdrawalRequestsAdminInput,
  Maybe,
  Profile,
  Shop,
  WithdrawalRequest,
} from "@features/API";
import { createGraphqlRequestClient } from "@UI/../api";
import { useQuery } from "react-query";

export type AdminGetWithdrawalsQueryVariables = Exact<{
  args: GetWithdrawalRequestsAdminInput;
}>;

export type AdminGetWithdrawalsQuery = { __typename?: "Query" } & {
  getWithdrawalRequests: Array<
    { __typename?: "WithdrawalRequest" } & Pick<
      WithdrawalRequest,
      "amount" | "id" | "processedAt" | "status" | "userId" | "requestedAt"
    > & {
        user: { __typename?: "Account" } & Pick<Account, "email" | "type"> & {
            shop: { __typename?: "Shop" } & Pick<Shop, "name">;
            profile?: Maybe<
              { __typename?: "Profile" } & Pick<Profile, "username">
            >;
          };
      }
  >;
};

type args = AdminGetWithdrawalsQueryVariables["args"];
export const adminGetWithdrawalQueryKey = (args: args) => [
  "admin-get-withdrawals",
  { args },
];

export const adminGetWithdrawalQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query adminGetWithdrawals($args:GetWithdrawalRequestsAdminInput!){
  getWithdrawalRequests(args:$args){
    amount
    id
    processedAt
    status
    userId
    user {
      shop{
        name
      }
      email
      type
      profile{
        username
      }
    }
  }
}
    `);

  const res = await client
    .setVariables<AdminGetWithdrawalsQueryVariables>({
      args,
    })
    .send<AdminGetWithdrawalsQuery>();

  return res.data.getWithdrawalRequests;
};

export const useAdminGetWithdrawalsQuery = (args: args) =>
  useQuery(adminGetWithdrawalQueryKey(args), () =>
    adminGetWithdrawalQueryFetcher(args)
  );
