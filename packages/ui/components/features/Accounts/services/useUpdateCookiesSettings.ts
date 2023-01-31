import { createGraphqlRequestClient } from "api";
import { Exact } from "types";
import {
  Mutation,
  UpdateUserCookiesSettingsInput,
} from "@features/Accounts/services/types";
import { useMutation } from "react-query";

export type UpdateMyCookiesMutationVariables = Exact<{
  args: UpdateUserCookiesSettingsInput;
}>;

export type UpdateMyCookiesMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "updateMyCookiesSettings"
>;

export const useUpdateCookiesSettings = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        mutation updateMyCookies(
            $args:UpdateUserCookiesSettingsInput!
        ){
            updateMyCookiesSettings(
                args:$args
            )
        }
    `);

  return useMutation<boolean, unknown, UpdateUserCookiesSettingsInput>(
    ["update-my-cookies"],
    async (data) => {
      const res = await client
        .setVariables<UpdateMyCookiesMutationVariables>({
          args: data,
        })
        .send<UpdateMyCookiesMutation>();

      return res.data.updateMyCookiesSettings;
    }
  );
};
