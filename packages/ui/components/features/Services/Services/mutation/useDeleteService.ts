import { Exact, Mutation, Scalars } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { UseQueryOptions, useMutation } from "react-query";

export type DeleteServiceMutationVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type DeleteServiceMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "deleteService"
>;

export const useDeleteServiceMutation = () => {
  return useMutation<boolean, unknown, DeleteServiceMutationVariables>(
    "delete-service",
    async (args) => {
      const client = createGraphqlRequestClient();

      const res = await client
        .setQuery(
          `
mutation deleteService($id:String!){
  deleteService(id:$id)
}
        `,
        )
        .setVariables<DeleteServiceMutationVariables>(args)
        .send<DeleteServiceMutation>();

      return res.data.deleteService;
    },
  );
};
