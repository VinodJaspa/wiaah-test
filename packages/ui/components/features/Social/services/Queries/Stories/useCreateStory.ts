import { createGraphqlRequestClient } from "@UI/../api";
import { Exact } from "types";
import { useMutation } from "react-query";
import { CreateStoryInput, Mutation } from "@features/Social/services/types";

export type CreateStoryMutationVariables = Exact<{
  args: CreateStoryInput;
}>;

export type CreateStoryMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "createStory"
>;

export const useCreateStory = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation createStory(
        $args:CreateStoryInput!
    ){
        createStory(
            createStoryInput:$args
        )
    }
    `);

  return useMutation<boolean, unknown, CreateStoryInput>(
    ["create-story"],
    async (data) => {
      const res = await client
        .setVariables<CreateStoryMutationVariables>({
          args: data,
        })
        .send<CreateStoryMutation>();
      return res.data.createStory;
    }
  );
};
