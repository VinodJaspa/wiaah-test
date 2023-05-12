import { createGraphqlRequestClient } from "@UI/../api";
import { Exact } from "types";
import { useMutation } from "react-query";
import { FollowProfileInput, Mutation } from "@features/API";

export type FollowProfileMutationVariables = Exact<{
  args: FollowProfileInput;
}>;

export type FollowProfileMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "followProfile"
>;

export const useFollowProfileMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation followProfile(
        $args:FollowProfileInput!
    ){
        followProfile(
            followUserInput:$args
        )
    }
    `);

  return useMutation<boolean, unknown, FollowProfileInput>(
    ["follow-profile"],
    async (data) => {
      const res = await client
        .setVariables<FollowProfileMutationVariables>({
          args: data,
        })
        .send<FollowProfileMutation>();

      return res.data.followProfile;
    }
  );
};
