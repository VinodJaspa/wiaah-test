import { createGraphqlRequestClient } from "@UI/../api";
import { Exact } from "types";
import { AdminDeleteServiceInput, Mutation } from "@features/Services/Services";
import { useMutation } from "react-query";

export type AdminDeleteServiceMutationVariables = Exact<{
  args: AdminDeleteServiceInput;
}>;

export type AdminDeleteServiceMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "adminDeleteService"
>;

export const useAdminDeleteServiceMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation adminDeleteService(
        $args:AdminDeleteServiceInput!
    ){
        adminDeleteService(
            args:$args
        )
    }
    `);

  return useMutation<boolean, unknown, AdminDeleteServiceInput>(
    ["admin-service-deletion"],
    async (data) => {
      const res = await client
        .setVariables<AdminDeleteServiceMutationVariables>({
          args: data,
        })
        .send<AdminDeleteServiceMutation>();

      return res.data.adminDeleteService;
    }
  );
};
