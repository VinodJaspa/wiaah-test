import { Exact, Mutation, Scalars } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AdminCloseRefundMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type AdminCloseRefundMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "adminCloseRefund"
>;

export const useAdminCloseRefundRequestMutation = () => {
  return useMutation<boolean, unknown, AdminCloseRefundMutationVariables>(
    ["admin-close-refund"],
    async (args) => {
      const client = createGraphqlRequestClient();

      const res = await client
        .setQuery(
          `
mutation adminCloseRefund($id:String!){
  adminCloseRefund(id:$id)
}
        `
        )
        .setVariables<AdminCloseRefundMutationVariables>(args)
        .send<AdminCloseRefundMutation>();

      return res.data.adminCloseRefund;
    }
  );
};
