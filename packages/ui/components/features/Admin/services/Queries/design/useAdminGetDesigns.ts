import { AdminGetDesignsInput, Design, Exact } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetDesignQueryVariables = Exact<{
  args: AdminGetDesignsInput;
}>;

export type AdminGetDesignQuery = { __typename?: "Query" } & {
  adminGetDesigns: Array<
    { __typename?: "Design" } & Pick<
      Design,
      "createdAt" | "id" | "name" | "placement" | "src" | "type" | "updatedAt"
    >
  >;
};

type args = AdminGetDesignQueryVariables["args"];
export const adminGetDesignsQueryKey = (args: args) => [
  "admin-get-designs-query-key",
  { args },
];

export const adminGetDesignsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query adminGetDesign(
  $args:AdminGetDesignsInput!
){
  adminGetDesigns(
    args:$args
  ){
    createdAt
    id
    name
    placement
    src
    type
    updatedAt
  }
}
    `);

  const res = await client
    .setVariables<AdminGetDesignQueryVariables>({
      args,
    })
    .send<AdminGetDesignQuery>();

  return res.data.adminGetDesigns;
};

export const useAdminGetDesignsQuery = (args: args) =>
  useQuery(adminGetDesignsQueryKey(args), () =>
    adminGetDesignsQueryFetcher(args)
  );
