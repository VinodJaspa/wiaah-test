import { AdminGetIdentitiyVerificationRequestsInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import { Exact } from "types";

export type GetAdminAccountIdentityRequestsQueryVariables = Exact<{
  args: AdminGetIdentitiyVerificationRequestsInput;
}>;

export type GetAdminAccountIdentityRequestsQuery = {
  __typename?: "Query";
  adminGetAccountIdentityVerificationRequests: Array<{
    __typename?: "IdentityVerification";
    id: string;
  }>;
};

type args = GetAdminAccountIdentityRequestsQueryVariables["args"];

export const useAdminGetAccountIdentityRequestsQuery = (args: args) =>
  useQuery(["admin-account-identity-requests", { args }], async () => {
    const client = createGraphqlRequestClient();

    const res = await client
      .setQuery(
        `
query getAdminAccountIdentityRequests(
  $args: AdminGetIdentitiyVerificationRequestsInput!
) {
  adminGetAccountIdentityVerificationRequests(args: $args) {
    id
  }
}
    `
      )
      .setVariables<GetAdminAccountIdentityRequestsQueryVariables>({ args })
      .send<GetAdminAccountIdentityRequestsQuery>();

    return res.data.adminGetAccountIdentityVerificationRequests;
  });
