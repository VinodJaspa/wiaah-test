import { Exact, Mutation, Scalars } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AdminAcceptAccountDeletionRequestMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type AdminAcceptAccountDeletionRequestMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "acceptAccountDeletionRequest">;

export const useAdminAcceptAccountDeletionRequest = () =>
  useMutation<
    boolean,
    unknown,
    AdminAcceptAccountDeletionRequestMutationVariables["id"]
  >(["accept-account-deletion"], async (data) => {
    const client = createGraphqlRequestClient();

    client.setQuery(`
mutation adminAcceptAccountDeletionRequest(
  $id:String!
){
  acceptAccountDeletionRequest(id:$id)
}
    `);

    const res = await client
      .setVariables<AdminAcceptAccountDeletionRequestMutationVariables>({
        id: data,
      })
      .send<AdminAcceptAccountDeletionRequestMutation>();

    return res.data.acceptAccountDeletionRequest;
  });
