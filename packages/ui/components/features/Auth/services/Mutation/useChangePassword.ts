import { Exact } from "types";
import { createGraphqlRequestClient } from "api";
import { ChangePasswordInput, Mutation } from "@features/API";
import { useMutation } from "react-query";

export type ChangePasswordMutationVariables = Exact<{
  changePasswordInput: ChangePasswordInput;
}>;

export type ChangePasswordMutation = {
  __typename?: "Mutation";
  changePassword: boolean;
};

export const useChangePasswordMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation changePassword(
      $changePasswordInput: ChangePasswordInput!
    ) {
      changePassword(
        changePasswordInput: $changePasswordInput
      )
    }
  `);

  return useMutation<boolean, unknown, ChangePasswordInput>(
    ["change-password"],
    async (data) => {
      const res = await client
        .setVariables<ChangePasswordMutationVariables>({
          changePasswordInput: data,
        })
        .send<ChangePasswordMutation>();

      return res.data.changePassword;
    }
  );
};
