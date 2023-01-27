import { createGraphqlRequestClient } from "api";
import { Exact } from "types";
import { useMutation } from "react-query";
import { CreateBlockInput, Mutation } from "@features/Social/services/types";

export type BlockUserMutationVariables = Exact<{
  args: CreateBlockInput;
}>;

export type BlockUserMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "blockUser"
>;

export const useBlockUserMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation blockUser(
        $args:CreateBlockInput!
    ){
        blockUser(
            args:$args
        )
    }
    `);

  return useMutation<boolean, unknown, CreateBlockInput>(
    ["block-user"],
    async (args) => {
      const res = await client
        .setVariables<BlockUserMutationVariables>({
          args,
        })
        .send<BlockUserMutation>();

      return res.data.blockUser;
    }
  );
};
