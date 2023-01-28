import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import { Exact } from "types";
import {
  CookiesSetting,
  UserCookiesSettings,
} from "@features/Accounts/services/types";

export type GetCookiesSettingsQueryVariables = Exact<{ [key: string]: never }>;

export type GetCookiesSettingsQuery = { __typename?: "Query" } & {
  getCookiesSettings: Array<
    { __typename?: "CookiesSetting" } & Pick<
      CookiesSetting,
      "benefits" | "cons" | "description" | "id" | "required" | "title"
    >
  >;
  getMyCookiesSettings: { __typename?: "UserCookiesSettings" } & Pick<
    UserCookiesSettings,
    "acceptedCookiesIds" | "acceptedRequired" | "id" | "userId"
  >;
};

export const useGetCookiesSettingsQuery = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        query getCookiesSettings{
            getCookiesSettings {
                benefits
                cons
                description
                id
                required
                title
            }

            getMyCookiesSettings {
                acceptedCookiesIds
                acceptedRequired
                id
                userId
            }
        }
    `);

  return useQuery(["get-cookies-settings"], async () => {
    const res = await client.send<GetCookiesSettingsQuery>();

    return {
      cookies: res.data.getCookiesSettings,
      myCookies: res.data.getMyCookiesSettings,
    };
  });
};
