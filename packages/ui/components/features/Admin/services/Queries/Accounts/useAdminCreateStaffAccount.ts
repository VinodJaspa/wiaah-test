import { AdminCreateAdminAccountInput, Exact, Mutation } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AdminCreateStaffAccountMutationVariables = Exact<{
  args: AdminCreateAdminAccountInput;
}>;

export type AdminCreateStaffAccountMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "adminCreateStaffAccount">;

export const useAdminCreateStaffAccountMutation = () =>
  useMutation<
    boolean,
    unknown,
    AdminCreateStaffAccountMutationVariables["args"]
  >(["admin-create-staff-account"], async (args) => {
    const client = createGraphqlRequestClient();

    client.setQuery(`
mutation adminCreateStaffAccount($args:AdminCreateAdminAccountInput!){
  adminCreateStaffAccount(args:$args)
}
    `);

    const res = await client
      .setVariables<AdminCreateStaffAccountMutationVariables>({
        args,
      })
      .send<AdminCreateStaffAccountMutation>();
    return res.data.adminCreateStaffAccount;
  });
