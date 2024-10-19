import { Exact } from "types";
import { createGraphqlRequestClient } from "api";
import { DeleteAccountRequestInput, Mutation } from "../../../features/API";
import { useMutation } from "react-query";

export type DeleteMyAccountMutationVariables = Exact<{
  args: DeleteAccountRequestInput;
}>;

export type DeleteMyAccountMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "requestAccountDeletion"
>;

export const useDeleteMyAccountMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation deleteMyAccount{
        requestAccountDeletion
    }
    `);

  return useMutation<boolean, unknown, DeleteAccountRequestInput>(
    ["delete-my-account"],
    async () => {
      const res = await client.send<DeleteMyAccountMutation>();
      return res.data.requestAccountDeletion;
    },
  );
};
