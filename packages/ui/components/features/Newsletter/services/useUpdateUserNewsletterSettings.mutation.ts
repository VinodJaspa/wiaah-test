import { createGraphqlRequestClient } from "api";
import { Exact, Mutation, Scalars, UpdateNewsletterInput } from "@features/API";
import { useMutation } from "react-query";

export type UpdateUserNewsletterSettingsMutationVariables = Exact<{
  id: Scalars["String"];
  args: UpdateNewsletterInput;
}>;

export type UpdateUserNewsletterSettingsMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "changeUserNewsletterSettings">;

export const useUpdateUserNewsletterSettingsMutation = () =>
  useMutation<
    UpdateUserNewsletterSettingsMutation["changeUserNewsletterSettings"],
    unknown,
    UpdateUserNewsletterSettingsMutationVariables
  >(["update-user-newsletter"], async (args) => {
    const client = createGraphqlRequestClient();

    const res = await client
      .setQuery(
        `
mutation updateUserNewsletterSettings($id:String!,$args:UpdateNewsletterInput!){
  changeUserNewsletterSettings(accountId:$id,args:$args)
}
    `
      )
      .setVariables<UpdateUserNewsletterSettingsMutationVariables>(args)
      .send<UpdateUserNewsletterSettingsMutation>();
    return res.data.changeUserNewsletterSettings;
  });
