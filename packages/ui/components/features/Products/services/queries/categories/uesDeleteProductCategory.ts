import { Category, Exact, Scalars } from "../../../../../features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type DeleteProductCategoryMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type DeleteProductCategoryMutation = { __typename?: "Mutation" } & {
  deleteProductCategory: { __typename?: "Category" } & Pick<Category, "id">;
};

type args = DeleteProductCategoryMutationVariables["id"];

export const useDeleteProductCategoryMutation = (args: args) => {
  return useQuery(["update-producty-category", { args }], async () => {
    const client = createGraphqlRequestClient();
    client.setQuery(`
mutation deleteProductCategory(
  $id:String!
) {
  deleteProductCategory(deleteCategoryId:$id){
    id
  }
}
    `);

    return (
      await client.setVariables({ args }).send<DeleteProductCategoryMutation>()
    ).data.deleteProductCategory;
  });
};
