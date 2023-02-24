import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";
import { Exact, Mutation, Scalars } from "@features/API";

export type MarkReportedContentCleanMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type MarkReportedContentCleanMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "removeReport">;

export const useAdminMarkReportedContentCleanMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(``);

  return useMutation<
    boolean,
    unknown,
    MarkReportedContentCleanMutationVariables["id"]
  >(["admin-mark-reported-content-clean"], async (id) => {
    const res = await client
      .setVariables<MarkReportedContentCleanMutationVariables>({ id })
      .send<MarkReportedContentCleanMutation>();

    return res.data.removeReport;
  });
};
