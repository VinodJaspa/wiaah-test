import { Exact, Mutation, UpdatePostAdminInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AdminUpdatePostMutationVariables = Exact<{
  args: UpdatePostAdminInput;
}>;

export type AdminUpdatePostMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "editNewsfeedPostAdmin"
>;

type args = AdminUpdatePostMutationVariables["args"];

export const useAdminUpdatePostMutation = () => {
  return useMutation<boolean, unknown, args>(
    "admin-update-post",
    async (args) => {
      const client = createGraphqlRequestClient();

      const res = await client
        .setQuery(
          `
mutation adminUpdatePost($args:UpdatePostAdminInput!){
  editNewsfeedPostAdmin(args:$args)
}
        `
        )
        .setVariables<AdminUpdatePostMutationVariables>({
          args,
        })
        .send<AdminUpdatePostMutation>();

      return res.data.editNewsfeedPostAdmin;
    }
  );
};
