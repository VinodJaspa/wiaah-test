import { CreateBillingAccountInput, Exact, Mutation } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";
import { GetMyPayoutAccountQuery } from "./useGetMyPayoutAccount";

export type UpdateBillingAccountMutationVariables = Exact<{
  args: GetMyPayoutAccountQuery["getMyBillingAccount"];
}>;

export type UpdateBillingAccountMutation = {
  __typename?: "Mutation";
  updateMyBillingAccount: {};
};

export const useUpdateMyBillingAccountMutation = () =>
  useMutation<
    UpdateBillingAccountMutation["updateMyBillingAccount"],
    unknown,
    UpdateBillingAccountMutationVariables["args"]
  >(["update-billing"], async (args) => {
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
  });
