import {
  AdminGetShippingGeoZoneRulesInput,
  Exact,
  ShippingRuleGeoZone,
  ShippingTypeRule,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type AdminGetShippingSettingsQueryVariables = Exact<{
  args: AdminGetShippingGeoZoneRulesInput;
}>;

export type AdminGetShippingSettingsQuery = { __typename?: "Query" } & {
  getShippingGeoZoneRules: Array<
    { __typename?: "ShippingTypeRule" } & Pick<
      ShippingTypeRule,
      "id" | "type" | "name" | "description"
    >
  >;
};

type args = AdminGetShippingSettingsQueryVariables["args"];

export const adminGetShippingSettingsQueryKey = (args: args) => [
  "admin-get-shipping",
  { args },
];

export const adminGetShippingSettingsFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query adminGetShippingSettings($args:AdminGetShippingGeoZoneRulesInput!){
  getShippingGeoZoneRules(args:$args) {
    id
    type
    name
    description
  }
}
  `);

  const res = await client
    .setVariables<AdminGetShippingSettingsQueryVariables>({
      args,
    })
    .send<AdminGetShippingSettingsQuery>();
  return res.data.getShippingGeoZoneRules;
};

export const useAdminGetShippingSettings = (args: args) =>
  useQuery(adminGetShippingSettingsQueryKey(args), () =>
    adminGetShippingSettingsFetcher(args)
  );
