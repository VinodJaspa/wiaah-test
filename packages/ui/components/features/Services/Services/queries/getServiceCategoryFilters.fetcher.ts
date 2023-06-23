import { Exact, ServiceFilterSelectionType, ServiceType } from "@features/API";
import { createGraphqlRequestClient } from "api";
import { UseQueryOptions, useQuery } from "react-query";

export type GetServiceCategoryFiltersQueryVariables = Exact<{
  serviceType: ServiceType;
}>;

export type GetServiceCategoryFiltersQuery = {
  __typename?: "Query";
  getServiceCategoryFilters: Array<{
    __typename?: "ServiceFilter";
    filterGroupName: string;
    id: string;
    selectionType: ServiceFilterSelectionType;
    filterValues: Array<{
      __typename?: "ServiceFilterValue";
      filteringValue: string;
      name: string;
      sortOrder: number;
    }>;
  }>;
};

type args = GetServiceCategoryFiltersQueryVariables;
export const getServiceCategoryFiltersQueryKey = (args: args) => [
  "get-service-category-filters",
  { args },
];

export const getServiceCategoryFiltersQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `
query getServiceCategoryFilters($serviceType:ServiceType!) {
    getServiceCategoryFilters(
        category:$serviceType
    ){
        filterGroupName
        id
        filterValues{
            filteringValue
            name
            sortOrder
        }
        selectionType
    }
}
`
    )
    .setVariables<GetServiceCategoryFiltersQueryVariables>(args)
    .send<GetServiceCategoryFiltersQuery>();

  return res.data.getServiceCategoryFilters;
};

export const useGetServiceCategoryFiltersQuery = (
  args: args,
  options?: UseQueryOptions<
    GetServiceCategoryFiltersQuery["getServiceCategoryFilters"],
    unknown,
    GetServiceCategoryFiltersQuery["getServiceCategoryFilters"],
    any
  >
) =>
  useQuery(
    getServiceCategoryFiltersQueryKey(args),
    () => getServiceCategoryFiltersQueryFetcher(args),
    options
  );
