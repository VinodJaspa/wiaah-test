import { Exact } from "types";
import { createGraphqlRequestClient } from "api";
import { ChangePasswordInput, Mutation } from "@features/API";
import { useMutation } from "react-query";

export type ChangePasswordMutationVariables = Exact<{
  args: ChangePasswordInput;
}>;

export type ChangePasswordMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "changePassword"
>;

export const useChangePasswordMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation changePassword(
        $args:ChangePasswordInput!
    ){
        changePassword(
            changePasswordInput:$args
        )
    }
    `);

  return useMutation<boolean, unknown, ChangePasswordInput>(
    ["change-password"],
    async (data) => {
      const res = await client
        .setVariables<ChangePasswordMutationVariables>({
          args: data,
        })
        .send<ChangePasswordMutation>();

      return res.data.changePassword;
    }
  );
};
