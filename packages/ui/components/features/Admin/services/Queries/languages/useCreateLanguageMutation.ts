import {
  CreateLanguageInput,
  Exact,
  Mutation,
  UpdateLanguageInput,
} from "@features/API";
import { createGraphqlRequestClient } from "@UI/../api";
import { useMutation } from "react-query";

export type AdminCreateLanguageMutationVariables = Exact<{
  args: CreateLanguageInput;
}>;

export type AdminCreateLanguageMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "createLanguage"
>;

export const useAdminCreateLanguageMutation = () => {
  return useMutation<
    boolean,
    unknown,
    AdminCreateLanguageMutationVariables["args"]
  >(["admin-update-language"], async (args) => {
    const client = createGraphqlRequestClient();

    client.setQuery(`
      mutation adminUpdateLanguage($args:UpdateLanguageInput!){
        updateLanguage(args:$args)
      }
    `);

    const res = await client
      .setVariables<AdminCreateLanguageMutationVariables>({ args })
      .send<AdminCreateLanguageMutation>();

    return res.data.createLanguage;
  });
};
