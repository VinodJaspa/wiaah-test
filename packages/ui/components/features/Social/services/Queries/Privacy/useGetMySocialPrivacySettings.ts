import { Exact } from "types";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";
import { PrivacySettings } from "@features/Social/services/types";

export type GetMyPrivacySettingsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetMyPrivacySettingsQuery = { __typename?: "Query" } & {
  getMyPrivacySettings: { __typename?: "PrivacySettings" } & Pick<
    PrivacySettings,
    | "hideCommentsNum"
    | "hideLikesNum"
    | "hideViewsNum"
    | "privateAccount"
    | "userId"
  >;
};

export const useGetMySocialPrivacySettings = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query getMyPrivacySettings {
        getMyPrivacySettings{
            hideCommentsNum
            hideLikesNum
            hideViewsNum
            privateAccount
            userId
        }
    }
`);

  return useQuery(["get-my-social-privacy-settings"], async () => {
    const res = await client.send<GetMyPrivacySettingsQuery>();

    return res.data.getMyPrivacySettings;
  });
};
