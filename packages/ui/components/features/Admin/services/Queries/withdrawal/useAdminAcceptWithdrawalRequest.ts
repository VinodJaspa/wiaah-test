import { Exact, Mutation, Scalars } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AdminAcceptWithdrawalRequestMutationVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type AdminAcceptWithdrawalRequestMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "processWithdrawalRequest">;

export const useAdminAcceptWithdrawalRequestMutation = () =>
  useMutation<
    boolean,
    unknown,
    AdminAcceptWithdrawalRequestMutationVariables["id"]
  >(["admin-accept-withdrawal-request"], async (id) => {
    const client = createGraphqlRequestClient();

    client.setQuery(`
mutation adminAcceptWithdrawalRequest($id:String!){
  processWithdrawalRequest(id:$id)
}
  `);

    const res = await client
      .setVariables<AdminAcceptWithdrawalRequestMutationVariables>({ id })
      .send<AdminAcceptWithdrawalRequestMutation>();

    return res.data.processWithdrawalRequest;
  });
