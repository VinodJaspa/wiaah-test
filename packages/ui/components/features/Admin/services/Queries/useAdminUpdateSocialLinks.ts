import { Exact, Mutation, UpdateSiteSocialInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AdminUpdateSocialLinksMutationVariables = Exact<{
  args: UpdateSiteSocialInput;
}>;

export type AdminUpdateSocialLinksMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "updateSocialLinks"
>;

export const useAdminUpdateSocialLinksMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
mutation adminUpdateSocialLinks(
  $args:UpdateSiteSocialInput!
){
  updateSocialLinks(args:$args)
}
    `);

  return useMutation<
    boolean,
    unknown,
    AdminUpdateSocialLinksMutationVariables["args"]
  >(["admin-update-social-linkssettings"], async (args) => {
    const res = await client
      .setVariables<AdminUpdateSocialLinksMutationVariables>({ args })
      .send<AdminUpdateSocialLinksMutation>();

    return res.data.updateSocialLinks;
  });
};
