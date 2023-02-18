import {
  Exact,
  Filter,
  GetFiltersInput,
  ProductFilterGroupValue,
} from "@features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetProductFitlersQueryVariables = Exact<{
  args: GetFiltersInput;
}>;

export type GetProductFitlersQuery = { __typename?: "Query" } & {
  getAdminProductsFilters: Array<
    { __typename?: "Filter" } & Pick<Filter, "id" | "name" | "sortOrder"> & {
        values: Array<
          { __typename?: "ProductFilterGroupValue" } & Pick<
            ProductFilterGroupValue,
            "name" | "sortOrder"
          >
        >;
      }
  >;
};

type args = GetProductFitlersQueryVariables["args"];

export const getAdminProductFiltersQueryKey = (args: args) => [
  "admin-product-filters",
  { args },
];

export const getAdminProductFitlersFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();
  client.setQuery(`
query getProductFitlers(
  $args:GetFiltersInput!
){
  getAdminProductsFilters(
    getFiltersArgs:$args
  ){
    id
    name
    sortOrder
    values {
      name
      sortOrder
    }
  }
}
    `);

  client.setVariables<GetProductFitlersQueryVariables>({
    args,
  });
  return (await client.send<GetProductFitlersQuery>()).data
    .getAdminProductsFilters;
};

export const useGetAdminProductsFitlersQuery = (args: args) => {
  return useQuery(getAdminProductFiltersQueryKey(args), () =>
    getAdminProductFitlersFetcher(args)
  );
};
