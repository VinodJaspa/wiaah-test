import { Account, Exact, UpdateSellerAccountAdminInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AdminUpdateAccountMutationVariables = Exact<{
  args: UpdateSellerAccountAdminInput;
}>;

export type AdminUpdateAccountMutation = { __typename?: "Mutation" } & {
  adminEditAccount: { __typename?: "Account" } & Pick<Account, "id">;
};

export const useAdminUpdateAccountMutation = () => {
  return useMutation<
    AdminUpdateAccountMutation["adminEditAccount"],
    unknown,
    AdminUpdateAccountMutationVariables["args"]
  >(["admin-update-account"], async (args) => {
    const client = createGraphqlRequestClient();

    const res = await client
      .setQuery(
        `
mutation adminUpdateAccount(
  $args:UpdateSellerAccountAdminInput!
){
  adminEditAccount(editAccountInput:$args){
    id
  }
}
        `
      )
      .setVariables<AdminUpdateAccountMutationVariables>({
        args,
      })
      .send<AdminUpdateAccountMutation>();

    return res.data.adminEditAccount;
  });
};
