import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";
import { Exact, Mutation, Scalars } from "@features/API";

export type AdminSuspenseReportedContentMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type AdminSuspenseReportedContentMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "suspenseReportedContent">;

export const useAdminSuspenseReportedContentMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
mutation adminSuspenseReportedContent(
  $id:String!
){
  suspenseReportedContent(id:$id)
}
  `);

  return useMutation<
    boolean,
    unknown,
    AdminSuspenseReportedContentMutationVariables["id"]
  >(["admin-mark-reported-content-clean"], async (id) => {
    const res = await client
      .setVariables<AdminSuspenseReportedContentMutationVariables>({ id })
      .send<AdminSuspenseReportedContentMutation>();

    return res.data.suspenseReportedContent;
  });
};
