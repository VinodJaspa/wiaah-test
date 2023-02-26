import { Exact, Mutation, UpdateMembershipInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AdminUpdateMembershipPlanMutationVariables = Exact<{
  args: UpdateMembershipInput;
}>;

export type AdminUpdateMembershipPlanMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "updateMembership">;

type args = AdminUpdateMembershipPlanMutationVariables["args"];
export const adminUpdatePlanQueryKey = (args: args) => [
  "admin-get-plans",
  { args },
];

export const adminUpdatePlansFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
mutation adminUpdateMembershipPlan(
  $args:UpdateMembershipInput!
){
  updateMembership(args:$args)
}
    `);

  const res = await client
    .setVariables<AdminUpdateMembershipPlanMutationVariables>({
      args,
    })
    .send<AdminUpdateMembershipPlanMutation>();

  return res.data.updateMembership;
};

export const useAdminUpdatePlanMutation = (args: args) =>
  useMutation(adminUpdatePlanQueryKey(args), () =>
    adminUpdatePlansFetcher(args)
  );
