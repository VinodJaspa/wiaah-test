import { Exact } from "types";
import { createGraphqlRequestClient } from "api";
import { UseQueryOptions, useQuery } from "react-query";
import { MessagingSettings } from "@features/API";

export type GetMyPrivacySettingsQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetMyPrivacySettingsQuery = {
  __typename?: "Query";
  getMyPrivacySettings: {
    __typename?: "PrivacySettings";
    hideCommentsNum: boolean;
    hideLikesNum: boolean;
    hideViewsNum: boolean;
    privateAccount: boolean;
    userId: string;
    messageReadStatus: boolean;
    initialMessaging: MessagingSettings;
  };
};

export const useGetMySocialPrivacySettings = (
  options?: UseQueryOptions<
    GetMyPrivacySettingsQuery["getMyPrivacySettings"],
    any,
    any,
    any
  >
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getMyPrivacySettings {
    getMyPrivacySettings{
        hideCommentsNum
        hideLikesNum
        hideViewsNum
        privateAccount
        userId
        messageReadStatus
        initialMessaging
    }
}
`);

  return useQuery(
    ["get-my-social-privacy-settings"],
    async () => {
      const res = await client.send<GetMyPrivacySettingsQuery>();

      return res.data.getMyPrivacySettings;
    },
    options
  );
};
