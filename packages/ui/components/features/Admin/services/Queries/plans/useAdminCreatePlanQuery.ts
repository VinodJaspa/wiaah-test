import { CreateMembershipInput, Exact, Mutation } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AdminCreateMembershipMutationVariables = Exact<{
  args: CreateMembershipInput;
}>;

export type AdminCreateMembershipMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "createMembership"
>;

type args = AdminCreateMembershipMutationVariables["args"];

export const useAdminCreatePlanMutation = (args: args) =>
  useMutation<boolean, unknown, args>(
    ["admin-create-membership"],
    async (args) => {
      const client = createGraphqlRequestClient();

      client.setQuery(`
mutation AdminCreateMembership (
  $args:CreateMembershipInput!
){
  createMembership(args:$args)
}
    `);

      const res = await client
        .setVariables<AdminCreateMembershipMutationVariables>({
          args,
        })
        .send<AdminCreateMembershipMutation>();

      return res.data.createMembership;
    }
  );
