import {
  AdminGetSiteInformationsInput,
  Exact,
  SiteInformation,
} from "@features/API";
import { createGraphqlRequestClient } from "@UI/../api";
import { useQuery } from "react-query";

export type AdminGetInformationsQueryVariables = Exact<{
  args: AdminGetSiteInformationsInput;
}>;

export type AdminGetInformationsQuery = { __typename?: "Query" } & {
  adminGetSiteInformations: Array<
    { __typename?: "SiteInformation" } & Pick<
      SiteInformation,
      | "id"
      | "descirption"
      | "title"
      | "slug"
      | "placements"
      | "route"
      | "sortOrder"
    >
  >;
};

type args = AdminGetInformationsQueryVariables["args"];

export const adminGetSiteInformationsQueryKey = (args: args) => [
  "admin-get-site-info",
  { args },
];

export const adminGetSiteInformationsFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
  
  `);

  const res = await client
    .setVariables<AdminGetInformationsQueryVariables>({ args })
    .send<AdminGetInformationsQuery>();

  return res.data.adminGetSiteInformations;
};

export const useAdminGetSiteInformationsQuery = (args: args) =>
  useQuery(adminGetSiteInformationsQueryKey(args), () =>
    adminGetSiteInformationsFetcher(args)
  );
