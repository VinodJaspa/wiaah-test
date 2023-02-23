import { CreateMaintenanceInput, Exact, Mutation } from "@features/API";
import { createGraphqlRequestClient } from "@UI/../api";
import { useMutation } from "react-query";

export type CreateMaintenanceMutationVariables = Exact<{
  args: CreateMaintenanceInput;
}>;

export type CreateMaintenanceMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "createMaintenancePage"
>;

export const useAdminCreateMaintenanceMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
mutation createMaintenance(
  $args:CreateMaintenanceInput!
){
  createMaintenancePage(args:$args)
}
  `);

  return useMutation<
    boolean,
    unknown,
    CreateMaintenanceMutationVariables["args"]
  >(["create-maintenance"], async (data) => {
    const res = await client
      .setVariables<CreateMaintenanceMutationVariables>({
        args: data,
      })
      .send<CreateMaintenanceMutation>();

    return res.data.createMaintenancePage;
  });
};
