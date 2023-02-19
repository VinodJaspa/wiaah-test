import { DeclineSellerAccountRequest, Exact, Mutation } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AdminRejectSellerAccountMutationVariables = Exact<{
  args: DeclineSellerAccountRequest;
}>;

export type AdminRejectSellerAccountMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "declineSellerAccount">;

export const useAdminRejectSellerRequestMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
  mutation adminRejectSellerAccount(
  $args:DeclineSellerAccountRequest!
){
  declineSellerAccount(
    args:$args
  )
}
  `);

  return useMutation<
    boolean,
    unknown,
    AdminRejectSellerAccountMutationVariables["args"]
  >(["accept-seller-account"], async (args) => {
    const res = await client
      .setVariables<AdminRejectSellerAccountMutationVariables>({ args })
      .send<AdminRejectSellerAccountMutation>();

    return res.data.declineSellerAccount;
  });
};
