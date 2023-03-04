import { CreateProfessionInput, Exact, Mutation } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AdminCreateProfessionMutationVariables = Exact<{
  args: CreateProfessionInput;
}>;

export type AdminCreateProfessionMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "createProfession"
>;

export const useAdminCreateProfessionMutation = () =>
  useMutation<
    AdminCreateProfessionMutation["createProfession"],
    unknown,
    AdminCreateProfessionMutationVariables["args"]
  >(["admin-update-profession"], async (args) => {
    const client = createGraphqlRequestClient();

    client.setQuery(`
mutation AdminCreateProfession($args:CreateProfessionInput!){
  createProfession(args:$args)
}
      `);

    const res = await client
      .setVariables<AdminCreateProfessionMutationVariables>({ args })
      .send<AdminCreateProfessionMutation>();

    return res.data.createProfession;
  });
