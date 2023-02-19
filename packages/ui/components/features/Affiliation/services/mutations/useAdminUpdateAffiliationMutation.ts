import { Exact, Mutation, UpdateAffiliationAdminInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AdminUpdateAffiliationMutationVariables = Exact<{
  args: UpdateAffiliationAdminInput;
}>;

export type AdminUpdateAffiliationMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "adminUpdateAffiliation"
>;

export const useAdminUpdateAffiliation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
mutation adminUpdateAffiliation(
  $args:UpdateAffiliationAdminInput!
){
  adminUpdateAffiliation(
    updateAffilaition:$args
  )
}
    `);

  return useMutation<
    AdminUpdateAffiliationMutation["adminUpdateAffiliation"],
    unknown,
    AdminUpdateAffiliationMutationVariables["args"]
  >(["admin-update-affiliation"], async (data) => {
    const res = await client
      .setVariables<AdminUpdateAffiliationMutationVariables>({ args: data })
      .send<AdminUpdateAffiliationMutation>();

    return res.data.adminUpdateAffiliation;
  });
};
