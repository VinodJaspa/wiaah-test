import { createGraphqlRequestClient } from "@UI/../api";
import { Exact } from "types";
import { useMutation } from "react-query";
import { LikeStoryInput, Mutation } from "@features/Social/services/types";

export type LikeStoryMutationVariables = Exact<{
  args: LikeStoryInput;
}>;

export type LikeStoryMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "likeStory"
>;

export const useLikeStory = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        mutation likeStory(
            $args:LikeStoryInput!
        ){
            likeStory(
                likeStoryInput:$args
            )
        }
    `);

  return useMutation<boolean, unknown, LikeStoryInput>(
    ["like-story"],
    async (input) => {
      const res = await client
        .setVariables<LikeStoryMutationVariables>({ args: input })
        .send<LikeStoryMutation>();

      return res.data.likeStory;
    }
  );
};
