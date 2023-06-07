import { Category, Exact, GetFilteredCategory } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetProductCategoriesQueryVariables = Exact<{
  args: GetFilteredCategory;
}>;

export type GetProductCategoriesQuery = { __typename?: "Query" } & {
  getFilteredProductCategories: Array<
    { __typename?: "Category" } & Pick<
      Category,
      "id" | "name" | "parantId" | "sortOrder" | "status"
    >
  >;
};

type args = GetProductCategoriesQueryVariables["args"];
export const getAdminProductCategoriesQueryKey = (args: args) => [
  "admin-product-categories",
  { args },
];

export const getAdminProductCategoriesFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  client.setQuery(`
query getProductCategories(
  $args:GetFilteredCategory!
){
  getFilteredProductCategories(
    args:$args
  ){
    id
    name
    parantId
    sortOrder
    status
  }
}

    `);

  client.setVariables<GetProductCategoriesQueryVariables>({
    args,
  });
  return (await client.send<GetProductCategoriesQuery>()).data
    .getFilteredProductCategories;
};

export const useGetAdminProductCategoriesQuery = (args: args) => {
  return useQuery(getAdminProductCategoriesQueryKey(args), () =>
    getAdminProductCategoriesFetcher(args)
  );
};
