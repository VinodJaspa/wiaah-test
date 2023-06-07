import {
  Account,
  AccountDeletionRequest,
  Exact,
  GetAccountDeletionRequestsInput,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetAccountDeletionRequestsQueryVariables = Exact<{
  args: GetAccountDeletionRequestsInput;
}>;

export type AdminGetAccountDeletionRequestsQuery = { __typename?: "Query" } & {
  getAccountDeletionRequests: Array<
    { __typename?: "AccountDeletionRequest" } & Pick<
      AccountDeletionRequest,
      "id" | "status" | "createdAt"
    > & {
        account: { __typename?: "Account" } & Pick<
          Account,
          "photo" | "firstName" | "lastName" | "email"
        >;
      }
  >;
};

type args = AdminGetAccountDeletionRequestsQueryVariables["args"];
export const adminGetAccountDeletionRequestsQueryKey = (args: args) => [
  "admin-deletion-requests",
  { args },
];

export const adminGetAccountDeletionRequestsQueryFetcher = async (
  args: args
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query adminGetAccountDeletionRequests(
  $args:GetAccountDeletionRequestsInput!
) {
  getAccountDeletionRequests(args:$args){
    id
    account {
      photo
    	firstName
      lastName
    	email
    }
      createdAt
    status
  }
}
    `);

  const res = await client
    .setVariables<AdminGetAccountDeletionRequestsQueryVariables>({ args })
    .send<AdminGetAccountDeletionRequestsQuery>();

  return res.data.getAccountDeletionRequests;
};

export const useAdminGetAccountDeletionRequests = (args: args) =>
  useQuery(adminGetAccountDeletionRequestsQueryKey(args), () =>
    adminGetAccountDeletionRequestsQueryFetcher(args)
  );
