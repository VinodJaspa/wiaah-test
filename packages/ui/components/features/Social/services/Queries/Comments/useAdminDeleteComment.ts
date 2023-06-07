import { createGraphqlRequestClient } from "api";
import { Exact, Mutation, Scalars } from "@features/API";
import { useMutation } from "react-query";

export type AdminDeleteCommentMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type AdminDeleteCommentMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "adminDeleteComment"
>;

export const useAdminDeleteCommentMutation = () =>
  useMutation<boolean, unknown, string>(["delete-comment"], async (id) => {
    const client = createGraphqlRequestClient();

    const res = await client
      .setQuery(
        `
mutation adminDeleteComment($id:String!){
  adminDeleteComment(commentId:$id)
}
    `
      )
      .setVariables<AdminDeleteCommentMutationVariables>({ id })
      .send<AdminDeleteCommentMutation>();

    return res.data.adminDeleteComment;
  });
