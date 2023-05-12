import { Exact, Maybe } from "@UI/../types/src";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";
import {
  Attachment,
  CreateCommentInput,
  Profile,
  Comment,
} from "@features/API";

export type CommentOnContentMutationVariables = Exact<{
  args: CreateCommentInput;
}>;

export type CommentOnContentMutation = { __typename?: "Mutation" } & {
  createComment: { __typename?: "Comment" } & Pick<
    Comment,
    | "id"
    | "authorProfileId"
    | "commentedAt"
    | "content"
    | "hostId"
    | "hostType"
    | "likes"
    | "userId"
  > & {
      attachments: Array<
        { __typename?: "Attachment" } & Pick<Attachment, "src" | "type">
      >;
      author?: Maybe<
        { __typename?: "Profile" } & Pick<Profile, "username" | "photo">
      >;
    };
};

export const useCommentOnContent = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
mutation createComment($args:CreateCommentInput!){
  createComment(createCommentInput:$args){
    id
  }
}
    `);

  return useMutation<
    CommentOnContentMutation["createComment"],
    unknown,
    CreateCommentInput
  >(["create-comment"], async (data) => {
    const res = await client
      .setVariables<CommentOnContentMutationVariables>({ args: data })
      .send<CommentOnContentMutation>();

    return res.data.createComment;
  });
};
