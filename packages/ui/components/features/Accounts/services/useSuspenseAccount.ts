import { createGraphqlRequestClient } from "@UI/../api";
import { Mutation, SuspenseAccountAdminInput } from "./types";
import { Exact } from "types";
import { useMutation } from "react-query";

export type SuspenseAccountMutationVariables = Exact<{
  args: SuspenseAccountAdminInput;
}>;

export type SuspenseAccountMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "suspenseAccount"
>;

export const useSuspenseAccount = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        mutation suspenseAccount(
            $args:SuspenseAccountAdminInput!
        ){
            suspenseAccount(
                args:$args
            )
        }
    `);

  return useMutation<boolean, unknown, SuspenseAccountAdminInput>(
    ["suspense-account"],
    async (data) => {
      const res = await client
        .setVariables<SuspenseAccountMutationVariables>({
          args: data,
        })
        .send<SuspenseAccountMutation>();

      return res.data.suspenseAccount;
    }
  );
};
