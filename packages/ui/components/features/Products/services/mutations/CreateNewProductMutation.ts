import { CreateProductInput, Exact, Product } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export type CreateProductMutationVariables = Exact<{
  args: CreateProductInput;
}>;

export type CreateProductMutation = { __typename?: "Mutation" } & {
  createNewProduct: { __typename?: "Product" } & Pick<Product, "id">;
};

export const useCreateNewProductMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
  mutation create(
    $input:$CreateProductInput
    ){
        createNewProduct(
            createNewProductInput:$input
        ){
            id
        }
    }
`);

  return useMutation<{ data: Product }, unknown, CreateProductInput, any>(
    "create-product",
    (data) => client.setVariables(data).send<Product>()
  );
};
