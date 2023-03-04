import { AdminGetProfessionInput, Exact, Profession } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetProfessionsQueryVariables = Exact<{
  args: AdminGetProfessionInput;
}>;

export type AdminGetProfessionsQuery = { __typename?: "Query" } & {
  adminGetProfessions: Array<
    { __typename?: "Profession" } & Pick<
      Profession,
      "id" | "sortOrder" | "title" | "usage"
    >
  >;
};

type args = AdminGetProfessionsQueryVariables["args"];
export const adminGetProfessionQueryKey = (args: args) => [
  "admin-get-profession",
  { args },
];

export const adminGetProfessionQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query adminGetProfessions($args:AdminGetProfessionInput!){
  adminGetProfessions(args:$args){
    id
    sortOrder
    title
    usage
  }
}
    `);

  const res = await client
    .setVariables<AdminGetProfessionsQueryVariables>({ args })
    .send<AdminGetProfessionsQuery>();

  return res.data.adminGetProfessions;
};

export const useAdminGetProfessionQuery = (args: args) =>
  useQuery(adminGetProfessionQueryKey(args), () =>
    adminGetProfessionQueryFetcher(args)
  );
