import { AdminGetMembershipsInput, Exact, Membership } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetAdminPlansQueryVariables = Exact<{
  args: AdminGetMembershipsInput;
}>;

export type GetAdminPlansQuery = { __typename?: "Query" } & {
  adminGetMemberships: Array<
    { __typename?: "Membership" } & Pick<
      Membership,
      "name" | "sortOrder" | "id"
    >
  >;
};

type args = GetAdminPlansQueryVariables["args"];
export const adminGetPlansQueryKey = (args: args) => [
  "admin-get-plans",
  { args },
];

export const adminGetPlansFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getAdminPlans($args:AdminGetMembershipsInput!){
  adminGetMemberships(
    args:$args
  ){
    id
    name
    sortOrder
  }
}
    `);

  const res = await client
    .setVariables<GetAdminPlansQueryVariables>({
      args,
    })
    .send<GetAdminPlansQuery>();

  return res.data.adminGetMemberships;
};

export const useAdminGetPlansQuery = (args: args) =>
  useQuery(adminGetPlansQueryKey(args), () => adminGetPlansFetcher(args));
