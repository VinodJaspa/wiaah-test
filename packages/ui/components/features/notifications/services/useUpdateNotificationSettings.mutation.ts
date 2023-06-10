import { createGraphqlRequestClient } from "api";
import {
  Exact,
  UpdateNotificationSettingInput,
  UserNotificationSettings,
} from "@features/API";
import { useMutation } from "react-query";

export type UpdateMyNotificationSettingsMutationVariables = Exact<{
  args: UpdateNotificationSettingInput;
}>;

export type UpdateMyNotificationSettingsMutation = {
  __typename?: "Mutation";
} & {
  updateMyNotification: { __typename?: "UserNotificationSettings" } & Pick<
    UserNotificationSettings,
    "id"
  >;
};

type args = UpdateMyNotificationSettingsMutationVariables["args"];

export const useUpdateUserNotificationSettingsMutation = () =>
  useMutation<
    UpdateMyNotificationSettingsMutation["updateMyNotification"],
    unknown,
    UpdateMyNotificationSettingsMutationVariables["args"]
  >(["update-my-notifications-settings"], async (args) => {
    const client = createGraphqlRequestClient();

    const res = await client
      .setQuery(
        `mutation updateMyNotificationSettings($args:UpdateNotificationSettingInput!){
  updateMyNotification(updateNotificationsArgs:$args){
    id
  }
}`
      )
      .setVariables<UpdateMyNotificationSettingsMutationVariables>({ args })
      .send<UpdateMyNotificationSettingsMutation>();

    return res.data.updateMyNotification;
  });
