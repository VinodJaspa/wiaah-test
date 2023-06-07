import { Exact, Mutation, Scalars } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type DeleteMaintenancePageMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type DeleteMaintenancePageMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "deleteMaintenancePage"
>;

export const useAdminDeleteMaintenancePageMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
mutation deleteMaintenancePage(
  $id:String!
){
  deleteMaintenancePage(id:$id)
}
    `);

  return useMutation<
    boolean,
    unknown,
    DeleteMaintenancePageMutationVariables["id"]
  >(["admin-delete-maintenance"], async (id: string) => {
    const res = await client
      .setVariables<DeleteMaintenancePageMutationVariables>({ id })
      .send<DeleteMaintenancePageMutation>();

    return res.data.deleteMaintenancePage;
  });
};
