import { createGraphqlRequestClient } from "@UI/../api";
import { Exact, Scalars } from "types";
import { Mutation, UnFollowProfileInput } from "@features/Social";
import { useMutation } from "react-query";

export type SendFollowReqMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type SendFollowReqMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "sendFollowRequest"
>;

export const useSendFollowRequestMutation = () => {
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

  return useMutation<boolean, unknown, string>(
    ["follow-profile"],
    async (data) => {
      const res = await client
        .setVariables<SendFollowReqMutationVariables>({
          id: data,
        })
        .send<SendFollowReqMutation>();

      return res.data.sendFollowRequest;
    }
  );
};
