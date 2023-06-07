import { Exact, SiteInformation } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetSiteSettingsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type AdminGetSiteSettingsQuery = { __typename?: "Query" } & {
  adminGetSiteInformations: { __typename?: "SiteInformation" } & Pick<
    SiteInformation,
    | "id"
    | "descirption"
    | "placements"
    | "route"
    | "slug"
    | "sortOrder"
    | "title"
  >;
};

export const adminGetSiteInformationsQueryKey = () => ["admin-get-site-info"];

export const adminGetSiteInformationsFetcher = async () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
  
  `);

  const res = await client.send<AdminGetSiteSettingsQuery>();

  return res.data.adminGetSiteInformations;
};

export const useAdminGetSiteInformationsQuery = () =>
  useQuery(adminGetSiteInformationsQueryKey(), () =>
    adminGetSiteInformationsFetcher()
  );
