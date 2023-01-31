import { createGraphqlRequestClient } from "api";
import { Exact } from "types";
import { useMutation } from "react-query";
import { CreateBlockInput, Mutation } from "@features/Social/services/types";

export type UnBlockUserMutationVariables = Exact<{
  args: CreateBlockInput;
}>;

export type UnBlockUserMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "unblockUser"
>;

export const useUnBlockUserMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        mutation unBlockUser(
            $args:CreateBlockInput!
        ){
            unblockUser(
                args:$args
            )
        }
    `);

  return useMutation<boolean, unknown, CreateBlockInput>(
    ["un-block-user"],
    async (args) => {
      const res = await client
        .setVariables<UnBlockUserMutationVariables>({
          args,
        })
        .send<UnBlockUserMutation>();

      return res.data.unblockUser;
    }
  );
};
