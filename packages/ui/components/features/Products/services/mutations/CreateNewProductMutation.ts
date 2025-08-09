import { CreateProductInput, Product } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useMutation } from "react-query";

export const useCreateNewProductMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation create($input: CreateProductInput!) {
      createNewProduct(createNewProductInput: $input) {
        id
      }
    }
  `);

  return useMutation<Product, unknown, CreateProductInput>(
    (input) =>
      client
        .setVariables({ input })
        .send<{ createNewProduct: Product }>()
        .then((res) => res.data.createNewProduct)
  );
};
