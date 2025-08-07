import { Exact } from "types";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

// 1. Input type
export type SuspendAccountMutationVariables = Exact<{
  args: {
    accountId: string;
  };
}>;

// 2. Response type
export type SuspendAccountMutation = {
  __typename?: "Mutation";
  suspendAccount: boolean;
};

// 3. Hook
export const useSuspendAccountMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation suspendAccount($args: SuspendAccountInput!) {
      suspendAccount(args: $args)
    }
  `);

  return useMutation<boolean, unknown, SuspendAccountMutationVariables>(
    ["suspend-account"],
    async (variables) => {
      const res = await client
        .setVariables<SuspendAccountMutationVariables>(variables)
        .send<SuspendAccountMutation>();
      return res.data.suspendAccount;
    }
  );
};
