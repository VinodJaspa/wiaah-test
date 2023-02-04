import { createGraphqlRequestClient } from "api";
import { Exact } from "types";
import { PrivacySettings, UpdateMyPrivacyInput } from "@features/API";
import { useMutation } from "react-query";

export type UpdateMyPrivacySettingsMutationVariables = Exact<{
  args: UpdateMyPrivacyInput;
}>;

export type UpdateMyPrivacySettingsMutation = { __typename?: "Mutation" } & {
  updateMyPrivacySettings: { __typename?: "PrivacySettings" } & Pick<
    PrivacySettings,
    "id"
  >;
};

export const useUpdateMyPrivacySettings = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        mutation updateMyPrivacySettings(
            $args:UpdateMyPrivacyInput!
        ){
            updateMyPrivacySettings(
                args:$args
            ){
                id
            }
        }
    `);

  return useMutation<
    UpdateMyPrivacySettingsMutation["updateMyPrivacySettings"],
    unknown,
    UpdateMyPrivacySettingsMutationVariables["args"]
  >(["update-privacy-settings"], async (args) => {
    const res = await client
      .setVariables<UpdateMyPrivacySettingsMutationVariables>({ args })
      .send<UpdateMyPrivacySettingsMutation>();

    return res.data.updateMyPrivacySettings;
  });
};
