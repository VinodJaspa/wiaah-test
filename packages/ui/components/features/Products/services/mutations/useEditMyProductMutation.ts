import { Product, UpdateProductInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { Exact } from "types";

export type EditProductMutationVariables = Exact<{
  args: UpdateProductInput;
}>;

export type EditProductMutation = { __typename?: "Mutation" } & {
  updateProduct: { __typename?: "Product" } & Pick<Product, "id">;
};

export const useEditMyProductMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
        mutation editProduct(
            $args:UpdateProductInput!
        ){
            updateProduct(
                updateProductArgs:$args
            ){
                id
            }
        }
    `);
};
