import {
  Exact,
  GetProductCategoriesCursorPaginationInput,
  ProductCategoryStatus,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  useQuery,
} from "react-query";

export type GetTopProductCategoriesQueryVariables = Exact<{
  args: GetProductCategoriesCursorPaginationInput;
}>;

export type GetTopProductCategoriesQuery = {
  __typename?: "Query";
  getTopProductCategories: {
    cursor?: string | null;
    nextCursor?: string;
    hasMore: boolean;
    total: number;
    data: Array<{
      id: string;
      name: string;
      parantId: string;
      sortOrder: number;
      status: ProductCategoryStatus;
    }>;
  };
};

type args = GetTopProductCategoriesQueryVariables["args"];
export const getTopCategoriesQueryKey = (args: args) => [
  "top-product-categories",
  { args },
];

export const getTopCategoriesQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `query getTopProductCategories(
    $args:GetProductCategoriesCursorPaginationInput!
){
    getTopProductCategories(
        args:$args
    ){
cursor
data{
    id
    name
    parantId
    sortOrder
    status
}
hasMore
total
nextCursor
    }
}`,
    )
    .setVariables<GetTopProductCategoriesQueryVariables>({ args })
    .send<GetTopProductCategoriesQuery>();

  return res.data.getTopProductCategories;
};

export const useGetTopProductCategoriesQuery = (
  args: args,
  options?: UseInfiniteQueryOptions<
    GetTopProductCategoriesQuery["getTopProductCategories"],
    unknown,
    GetTopProductCategoriesQuery["getTopProductCategories"],
    GetTopProductCategoriesQuery["getTopProductCategories"],
    any
  >,
) =>
  useInfiniteQuery(
    getTopCategoriesQueryKey(args),
    ({ pageParam }) =>
      getTopCategoriesQueryFetcher({ ...args, cursor: pageParam }),
    options,
  );
