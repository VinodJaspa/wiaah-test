import { Exact, ProductCategoryStatus } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetCategoryByIdQueryQueryVariables = Exact<{
  id: string;
}>;

export type GetCategoryByIdQueryQuery = {
  __typename?: "Query";
  getProductCategoryById?: {
    __typename?: "Category";
    id: string;
    name: string;
    status: ProductCategoryStatus;
    sortOrder: number;
    sales: number;
  } | null;
};

export const getCategoryByIdQueryKey = (id: string) => [
  "get-category-by-id",
  { id },
];

export const getCategoryBuIdQueryFetcher = async (id: string) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getCategoryByIdQuery($id:String!) {
    getProductCategoryById(
        id:$id
    ){
        id
        name
        status
        sortOrder
        sales
    }
}   
    `,
    )
    .setVariables<GetCategoryByIdQueryQueryVariables>({
      id,
    })
    .send<GetCategoryByIdQueryQuery>();

  return res.data?.getProductCategoryById;
};

export const useGetCategoryByIdQuery = (id: string) =>
  useQuery(getCategoryByIdQueryKey(id), () => getCategoryBuIdQueryFetcher(id));
