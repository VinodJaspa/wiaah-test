import {
  Category,
  Exact,
  UpdateCategoryInput,
} from "../../../../../features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type UpdateProductCategoryMutationVariables = Exact<{
  args: UpdateCategoryInput;
}>;

export type UpdateProductCategoryMutation = { __typename?: "Mutation" } & {
  updateProductCategory: { __typename?: "Category" } & Pick<Category, "id">;
};

type args = UpdateProductCategoryMutationVariables["args"];

export const useUpdateProductCategoryMutation = () => {
  return useMutation<
    UpdateProductCategoryMutation["updateProductCategory"],
    unknown,
    args
  >(["update-producty-category"], async (args) => {
    const client = createGraphqlRequestClient();
    client.setQuery(`
mutation updateProductCategory(
  $args:UpdateCategoryInput!
){
  updateProductCategory(updateCategoryArgs:$args){
    id
  }
}
    `);

    return (
      await client
        .setVariables<UpdateProductCategoryMutationVariables>({ args })
        .send<UpdateProductCategoryMutation>()
    ).data.updateProductCategory;
  });
};
