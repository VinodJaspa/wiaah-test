import { Exact, Mutation, UpdateProfessionInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AdminUpdateProfessionMutationVariables = Exact<{
  args: UpdateProfessionInput;
}>;

export type AdminUpdateProfessionMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "updateProfession"
>;

export const useAdminUpdateProfessionMutation = () =>
  useMutation<
    AdminUpdateProfessionMutation["updateProfession"],
    unknown,
    AdminUpdateProfessionMutationVariables["args"]
  >(["admin-update-profession"], async (args) => {
    const client = createGraphqlRequestClient();

    client.setQuery(`
    mutation adminUpdateProfession($args:UpdateProfessionInput!){
    updateProfession(args:$args)
    }
      `);

    const res = await client
      .setVariables<AdminUpdateProfessionMutationVariables>({ args })
      .send<AdminUpdateProfessionMutation>();

    return res.data.updateProfession;
  });
