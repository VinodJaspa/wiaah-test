import { Account, AdminGetStaffAccountsInput, Exact } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetStaffAccontsQueryVariables = Exact<{
  args: AdminGetStaffAccountsInput;
}>;

export type GetStaffAccontsQuery = { __typename?: "Query" } & {
  adminGetStaffAccounts: Array<
    { __typename?: "Account" } & Pick<
      Account,
      | "id"
      | "firstName"
      | "lastName"
      | "email"
      | "photo"
      | "status"
      | "lastActiveAt"
      | "type"
    >
  >;
};
type args = GetStaffAccontsQueryVariables["args"];
export const adminGetStaffAccountsQueryKey = (args: args) => [
  "admin-get-staff",
  { args },
];

export const adminGetStaffAccountsFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getStaffAcconts($args:AdminGetStaffAccountsInput!){
  adminGetStaffAccounts(args:$args){
    id
    firstName
    lastName
    email
    photo
    status
    lastActiveAt
    type
  }
}

  `);

  const res = await client
    .setVariables<GetStaffAccontsQueryVariables>({
      args,
    })
    .send<GetStaffAccontsQuery>();

  return res.data.adminGetStaffAccounts;
};

export const uesAdminGetStaffAccountsQuery = (args: args) =>
  useQuery(adminGetStaffAccountsQueryKey(args), () =>
    adminGetStaffAccountsFetcher(args)
  );
