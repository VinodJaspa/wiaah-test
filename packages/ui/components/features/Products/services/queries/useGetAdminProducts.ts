import { Exact } from "types";
import { createGraphqlRequestClient } from "api";
import {
  GetFilteredProductsAdminInput,
  Product,
  ProductPresentation,
  QueryGetAdminProductsFiltersArgs,
} from "@features/API";
import { useQuery } from "react-query";

export type GetAdminProductsQueryVariables = Exact<{
  args: GetFilteredProductsAdminInput;
}>;

export type GetAdminProductsQuery = { __typename?: "Query" } & {
  getAdminFilteredProducts: Array<
    { __typename?: "Product" } & Pick<
      Product,
      | "title"
      | "sellerId"
      | "id"
      | "price"
      | "stock"
      | "usageStatus"
      | "status"
      | "updatedAt"
    > & {
        presentations: Array<
          { __typename?: "ProductPresentation" } & Pick<
            ProductPresentation,
            "src" | "type"
          >
        >;
      }
  >;
};

export const useGetAdminProductsQuery = (
  input: GetFilteredProductsAdminInput
) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
    query getAdminProducts(
        $args:GetFilteredProductsAdminInput!
    ){
        getAdminFilteredProducts(
            args:$args
        ){
            presentations{
                src
                type
            }
            title
            sellerId
            id
            price
            stock
            usageStatus
            status
            updatedAt
        }
    }
    `);

  client.setVariables<GetAdminProductsQueryVariables>({
    args: input,
  });

  return useQuery(["get-admin-products", { input }], async () => {
    const res = await client.send<GetAdminProductsQuery>();
    return res.data.getAdminFilteredProducts;
  });
};
