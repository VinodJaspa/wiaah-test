import { Exact, Mutation, Scalars } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type AdminRejectAccountDeletionRequestMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type AdminRejectAccountDeletionRequestMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "rejectAccountDeletionRequest">;

export const useAdminRejectAccountDeletionRequest = () =>
  useMutation<
    boolean,
    unknown,
    AdminRejectAccountDeletionRequestMutationVariables["id"]
  >(["reject-account-deletion"], async (data) => {
    const client = createGraphqlRequestClient();

    client.setQuery(`
mutation adminRejectAccountDeletionRequest(
  $id:String!
){
  rejectAccountDeletionRequest(id:$id)
}
    `);

    const res = await client
      .setVariables<AdminRejectAccountDeletionRequestMutationVariables>({
        id: data,
      })
      .send<AdminRejectAccountDeletionRequestMutation>();

    return res.data.rejectAccountDeletionRequest;
  });
