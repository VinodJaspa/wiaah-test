import { createGraphqlRequestClient } from "api";
import { Exact, Scalars } from "types";
import { useMutation } from "react-query";
import { Product } from "@features/API";

export type DeleteMyProductMutationVariables = Exact<{
  id: Scalars["ID"];
}>;

export type DeleteMyProductMutation = { __typename?: "Mutation" } & {
  deleteProduct: { __typename?: "Product" } & Pick<Product, "id">;
};

export const useDeleteMyProductMutation = () => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    mutation deleteMyProduct(
        $id:ID!
    ){
        deleteProduct(
            productId:$id
        ){
            id
        }
    }
    `);

  return useMutation<
    DeleteMyProductMutation["deleteProduct"],
    unknown,
    DeleteMyProductMutationVariables["id"]
  >(["delete-my-product"], async (data) => {
    const res = await client
      .setVariables<DeleteMyProductMutationVariables>({
        id: data,
      })
      .send<DeleteMyProductMutation>();

    return res.data.deleteProduct;
  });
};
