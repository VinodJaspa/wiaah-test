import { AdminUpdateAdminAccountInput, Exact, Mutation } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AdminUpdateStaffAccountMutationVariables = Exact<{
  args: AdminUpdateAdminAccountInput;
}>;

export type AdminUpdateStaffAccountMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "adminUpdateStaffAccount">;

export const useAdminUpdateStaffAccountMutation = () =>
  useMutation<
    boolean,
    unknown,
    AdminUpdateStaffAccountMutationVariables["args"]
  >(["admin-update-staff-account"], async (args) => {
    const client = createGraphqlRequestClient();

    client.setQuery(`
mutation adminUpdateStaffAccount($args:AdminUpdateAdminAccountInput!){
  adminUpdateStaffAccount(args:$args)
}
    `);

    const res = await client
      .setVariables<AdminUpdateStaffAccountMutationVariables>({
        args,
      })
      .send<AdminUpdateStaffAccountMutation>();
    return res.data.adminUpdateStaffAccount;
  });
