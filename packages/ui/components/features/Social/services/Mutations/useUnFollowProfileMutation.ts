import { createGraphqlRequestClient } from "api";
import { Exact } from "types";
import { UnFollowProfileInput, Mutation } from "@features/API/gql/generated";
import { useMutation } from "react-query";

export type UnFollowProfileMutationVariables = Exact<{
  args: UnFollowProfileInput;
}>;

export type UnFollowProfileMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "unFollow"
>;

export const useUnFollowProfileMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation unFollowProfile(
        $args:UnFollowProfileInput!
    ){
        unFollow(
            unFollowProfileInput:$args
        )
    }
  `);

  return useMutation<boolean, unknown, UnFollowProfileInput>(
    ["follow-profile"],
    async (data) => {
      const res = await client
        .setVariables<UnFollowProfileMutationVariables>({
          args: data,
        })
        .send<UnFollowProfileMutation>();

      return res.data.unFollow;
    },
  );
};
