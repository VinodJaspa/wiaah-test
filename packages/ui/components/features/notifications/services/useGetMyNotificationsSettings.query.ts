import { createGraphqlRequestClient } from "@UI/../api";
import { Exact, Scalars, UserNotificationSettings } from "@features/API";
import { UseQueryOptions, useQuery } from "react-query";

export type GetMyNotificationSettingsQueryVariables = Exact<{
  userId: Scalars["String"];
}>;

export type GetMyNotificationSettingsQuery = { __typename?: "Query" } & {
  getUserNotificationsSettings: {
    __typename?: "UserNotificationSettings";
  } & Pick<
    UserNotificationSettings,
    "commentLike" | "mentions" | "postComment" | "postReaction"
  >;
};

type args = GetMyNotificationSettingsQueryVariables;

export const getUserNotificationsSettingsQueryKey = (args: args) => [
  "get-user-notifications-settings",
  { args },
];

export const getUserNotificationsSettingsFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getMyNotificationSettings($userId:String!) {
  getUserNotificationsSettings(
    userId:$userId
  ) {
    commentLike
    mentions
    postComment
    postReaction 
  }
}
    `
    )
    .setVariables<GetMyNotificationSettingsQueryVariables>(args)
    .send<GetMyNotificationSettingsQuery>();

  return res.data.getUserNotificationsSettings;
};

export const useGetUserNotificationsSettingsQuery = (
  args: args,
  options?: UseQueryOptions<
    GetMyNotificationSettingsQuery["getUserNotificationsSettings"],
    any,
    GetMyNotificationSettingsQuery["getUserNotificationsSettings"],
    any
  >
) =>
  useQuery(
    getUserNotificationsSettingsQueryKey(args),
    () => getUserNotificationsSettingsFetcher(args),
    options
  );
