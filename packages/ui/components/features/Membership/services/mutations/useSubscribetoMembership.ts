import { useGraphqlRequestClient } from "@UI/libs/useGraphqlRequestClient";
import { Exact, Mutation, Scalars } from "@features/API";
import { useMutation } from "react-query";

export type SubscribeMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type SubscribeMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "subscribeMembership"
>;

export const useSubscribeToMembershipMutation = () => {
  const { client } = useGraphqlRequestClient();
  return useMutation<SubscribeMutation, unknown, SubscribeMutationVariables>(
    ["subscribe-membership"],
    async (args) => {
      const res = await client
        .setQuery(
          `
mutation subscribe($id:String!){
  subscribeMembership(membershipId:$id)
}
        `
        )
        .setVariables<SubscribeMutationVariables>({ id: "" })
        .send<SubscribeMutation>();

      return res.data;
    }
  );
};
