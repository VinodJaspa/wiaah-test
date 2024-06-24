import { CreateBillingAccountInput, Exact, Mutation } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type UpdateBillingAccountMutationVariables = Exact<{
  args: CreateBillingAccountInput;
}>;

export type UpdateBillingAccountMutation = {
  __typename?: "Mutation";
  updateMyBillingAccount: any; // Adjust return type based on actual response type
};

export const useUpdateMyBillingAccountMutation = () =>
  useMutation<boolean, unknown, UpdateBillingAccountMutationVariables["args"]>(
    ["update-billing"],
    async (args) => {
      const client = createGraphqlRequestClient();

      const res = await client
        .setQuery(
          `
mutation updateBillingAccount ($args:CreateBillingAccountInput!){
  updateMyBillingAccount(args:$args)
}
    `
        )
        .setVariables<UpdateBillingAccountMutationVariables>({
          args,
        })
        .send<UpdateBillingAccountMutation>();

      return res.data.updateMyBillingAccount;
    }
  );
