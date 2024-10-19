import {
  Exact,
  Filter,
  ProductFilterGroupValue,
  Scalars,
} from "../../../../../features/API";
import { createGraphqlRequestClient } from "api";
import { useQuery } from "react-query";

export type GetProductFitlerQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type GetProductFitlerQuery = { __typename?: "Query" } & {
  getAdminProductsFilter: { __typename?: "Filter" } & Pick<
    Filter,
    "id" | "name" | "sortOrder"
  > & {
    values: Array<
      { __typename?: "ProductFilterGroupValue" } & Pick<
        ProductFilterGroupValue,
        "name" | "sortOrder"
      >
    >;
  };
};

type args = GetProductFitlerQueryVariables["id"];

export const getAdminProductFilterQueryKey = (args: args) => [
  "admin-product-filters",
  { args },
];

export const getAdminProductFitlerFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();
  client.setQuery(`
query getProductFitler(
  $id:String!
){
  getAdminProductsFilter(
    id:$id
  ){
    id
    name
    sortOrder
    values{
      name
      sortOrder
    }
  }
}
    `);

  client.setVariables<GetProductFitlerQueryVariables>({
    id: args,
  });
  return (await client.send<GetProductFitlerQuery>()).data
    .getAdminProductsFilter;
};

export const useGetAdminProductFitlerQuery = (args: args) => {
  return useQuery(
    getAdminProductFilterQueryKey(args),
    () => getAdminProductFitlerFetcher(args),
    {
      enabled: !!args,
    },
  );
};
