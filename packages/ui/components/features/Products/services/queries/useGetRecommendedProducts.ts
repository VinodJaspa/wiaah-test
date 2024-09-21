import { Exact, GqlPaginationInput } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetRecommendedProductsQueryVariables = Exact<{
  args: GqlPaginationInput;
}>;

export type GetRecommendedProductsQuery = {
  __typename?: "Query";
  getProductRecommendation: {
    __typename?: "ProductPaginationResponse";
    hasMore: boolean;
    total: number;
    data: Array<{
      __typename?: "Product";
      id: string;
      rate: number;
      reviews: number;
      thumbnail: string;
      title: string;
      description: string;
      saved: boolean;
      price: number;
    }>;
  };
};

type args = GetRecommendedProductsQueryVariables["args"];
export const getRecommendedProductsQueryKey = (args: args) => [
  "get-recommended-products",
  { args },
];

export const getRecommendedProductsQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getRecommendedProducts($args:GqlPaginationInput!){
    getProductRecommendation(
        pagination:$args
    ) {
        data {
            id
            rate
            reviews
            thumbnail
            title
            description
            saved
            price
        }
        hasMore
        total
    }
}
    `
    )
    .setVariables<GetRecommendedProductsQueryVariables>({ args })
    .send<GetRecommendedProductsQuery>();

  return res.data.getProductRecommendation;
};

export const useGetRecommendedProducts = (args: args) =>
  useQuery(
    getRecommendedProductsQueryKey(args),
    () => getRecommendedProductsQueryFetcher(args),
    {
      enabled: false,
      cacheTime: Infinity, // Keep the data in cache indefinitely
      staleTime: Infinity, // Prevent re-fetching due to stale data
    }
  );
