import { Exact, Mutation, Scalars } from "@features/API";
import { createGraphqlRequestClient } from "@UI/../api";
import { useMutation } from "react-query";

export type AdminConfirmRefundRequestMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type AdminConfirmRefundRequestMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "adminConfirmRefund">;

export const useAdminConfirmRefundRequestMutation = () =>
  useMutation<boolean, unknown, AdminConfirmRefundRequestMutationVariables>(
    ["admin-confirm-refund"],
    async (args) => {
      const client = createGraphqlRequestClient();

      const res = await client
        .setQuery(
          `
mutation adminConfirmRefundRequest(
  $id:String!
){
  adminConfirmRefund(id:$id)
}
    `
        )
        .setVariables<AdminConfirmRefundRequestMutationVariables>(args)
        .send<AdminConfirmRefundRequestMutation>();

      return res.data.adminConfirmRefund;
    }
  );
