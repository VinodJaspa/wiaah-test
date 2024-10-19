import { Exact, Filter, UpdateFilterInput } from "../../../../../features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type UpdateProductFilterMutationVariables = Exact<{
  args: UpdateFilterInput;
}>;

export type UpdateProductFilterMutation = { __typename?: "Mutation" } & {
  updateFilter: { __typename?: "Filter" } & Pick<Filter, "id">;
};

export const useupdateProductFilter = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
mutation updateProductFilter($args:UpdateFilterInput!) {
  updateFilter(updateFilterArgs:$args){
    id
  }
}
  `);

  return useMutation<
    UpdateProductFilterMutation["updateFilter"],
    unknown,
    UpdateProductFilterMutationVariables
  >(["update-product-filter"], async (args) => {
    return (
      await client
        .setVariables<UpdateProductFilterMutationVariables>(args)
        .send<UpdateProductFilterMutation>()
    ).data.updateFilter;
  });
};
