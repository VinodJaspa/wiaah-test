import { createGraphqlRequestClient } from "api";
import { Exact } from "types";
import { useMutation } from "react-query";
import { CreateReactionInput, Mutation } from "@features/API";

export type LikeContentMutationVariables = Exact<{
  args: CreateReactionInput;
}>;

export type LikeContentMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "createReaction"
>;

export const useLikeContent = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        mutation likeContent(
            $args:CreateReactionInput!
        ){
            createReaction(
                CreateReactionInput:$args
            )
        }
    `);

  return useMutation<boolean, unknown, LikeContentMutationVariables>(
    ["content-like"],
    async () => {
      const res = await client.send<LikeContentMutation>();
      return res.data.createReaction;
    }
  );
};
