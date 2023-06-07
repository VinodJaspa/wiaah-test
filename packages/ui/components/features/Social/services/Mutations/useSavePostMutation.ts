import { createGraphqlRequestClient } from "api";
import { Exact, Mutation, Scalars } from "@features/API";
import { useMutation } from "react-query";

export type SavePostMutationVariables = Exact<{
  postId: Scalars["String"];
}>;

export type SavePostMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "savePost"
>;

type args = SavePostMutationVariables;
export const useSavePostMutation = () =>
  useMutation<boolean, unknown, args>(["save-post"], async (args) => {
    const client = createGraphqlRequestClient();

    const res = await client
      .setQuery(
        `
mutation savePost($postId:String!){
  savePost(postId:$postId)
}
    `
      )
      .setVariables<args>(args)
      .send<SavePostMutation>();

    return res.data.savePost;
  });
