import { CreateActionInput, Exact, Mutation } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type CreateActionMutationVariables = Exact<{
  args: CreateActionInput;
}>;

export type CreateActionMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "createAction"
>;

export const useCreateActionMutation = () => {
  return useMutation<boolean, unknown, CreateActionMutationVariables["args"]>(
    ["create-action"],
    async (args) => {
      const client = createGraphqlRequestClient();
      client.setQuery(``);

      const res = await client
        .setVariables<CreateActionMutationVariables>({
          args,
        })
        .send<CreateActionMutation>();

      return res.data.createAction;
    }
  );
};
