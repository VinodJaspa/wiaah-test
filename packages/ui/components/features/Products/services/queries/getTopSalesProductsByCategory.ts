import {
  Exact,
  GetTopSalesProductsByCategoryPaginationInput,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { UseQueryOptions, useQuery } from "react-query";

export type GetTopSalesProductsQueryQueryVariables = Exact<{
  args: GetTopSalesProductsByCategoryPaginationInput;
}>;

export type GetTopSalesProductsQueryQuery = {
  __typename?: "Query";
  getTopSalesProducts: {
    __typename?: "ProductSearchPaginationResponse";
    total: number;
    hasMore: boolean;
    data: Array<{
      __typename?: "Product";
      thumbnail: string;
      title: string;
      rate: number;
      description: string;
      reviews: number;
      price: number;
      id: string;
      vendor_external_link: string;
      saved: boolean;
      isExternalShopping: boolean;
      category?: { __typename?: "Category"; name: string } | null;
    }>;
  };
};

type args = GetTopSalesProductsQueryQueryVariables["args"];
export const getTopProductsByCategoryIdQueryKey = (args: args) => [
  "get-top-sales-products-by-category",
  { args },
];

export const getTopSalesProductsByCategoryIdQueryFetcher = async (
  args: args
) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getTopSalesProductsQuery(
    $args:GetTopSalesProductsByCategoryPaginationInput!
) {
    getTopSalesProducts(
        args:$args
    ){
        total
        hasMore
        data {
            thumbnail
            title
            rate
            description
            reviews
            price
            id
            vendor_external_link
            saved
            isExternalShopping
            category {
                name
            }
        }
    }
}
  `
    )
    .setVariables<GetTopSalesProductsQueryQueryVariables>({
      args,
    })
    .send<GetTopSalesProductsQueryQuery>();

  return res.data.getTopSalesProducts;
};

export const useGetTopSalesProductsByCategoryIdQuery = (
  args: args,
  options?: UseQueryOptions<
    GetTopSalesProductsQueryQuery["getTopSalesProducts"],
    any,
    GetTopSalesProductsQueryQuery["getTopSalesProducts"],
    any
  >
) =>
  useQuery(
    getTopProductsByCategoryIdQueryKey(args),
    () => getTopSalesProductsByCategoryIdQueryFetcher(args),
    options
  );
