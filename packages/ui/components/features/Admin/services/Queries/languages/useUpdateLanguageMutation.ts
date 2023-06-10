import { Exact, Mutation, UpdateLanguageInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AdminUpdateLanguageMutationVariables = Exact<{
  args: UpdateLanguageInput;
}>;

export type AdminUpdateLanguageMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "updateLanguage"
>;

export const useAdminUpdateLanguageMutation = () => {
  return useMutation<
    boolean,
    unknown,
    AdminUpdateLanguageMutationVariables["args"]
  >(["admin-update-language"], async (args) => {
    const client = createGraphqlRequestClient();

    client.setQuery(`
        mutation adminUpdateLanguage($args:UpdateLanguageInput!){
            updateLanguage(args:$args)
        }
    `);

    const res = await client
      .setVariables<AdminUpdateLanguageMutationVariables>({ args })
      .send<AdminUpdateLanguageMutation>();

    return res.data.updateLanguage;
  });
};
