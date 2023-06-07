import { createGraphqlRequestClient } from "api";
import {
  Exact,
  ServiceCategory,
  ServiceCategoryFilterValue,
  ServiceType,
} from "@features/API";
import { useQuery } from "react-query";

export type GetServiceCategoryByTypeQueryVariables = Exact<{
  type: ServiceType;
}>;

export type GetServiceCategoryByTypeQuery = { __typename?: "Query" } & {
  getServiceCategoryByType: { __typename?: "ServiceCategory" } & Pick<
    ServiceCategory,
    "id" | "description" | "name" | "thumbnail" | "type"
  > & {
      filters: Array<
        { __typename?: "ServiceCategoryFilterValue" } & Pick<
          ServiceCategoryFilterValue,
          "filteringValue" | "name" | "sortOrder"
        >
      >;
    };
};

type args = GetServiceCategoryByTypeQueryVariables;

export const getServiceFiltersQueryKey = (args: args) => [
  "get-service-filters",
  { args },
];

export const getServiceFiltersQueryFetcher = async (args: args) => {
  const client = createGraphqlRequestClient();

  const res = await client
    .setQuery(
      `query getServiceCategoryByType($type:ServiceType!){
  getServiceCategoryByType(type:$type){
    id
    filters{
      filteringValue
      name
      sortOrder
    }
    description
    name
    thumbnail
    type
  }
}`
    )
    .setVariables<GetServiceCategoryByTypeQueryVariables>(args)
    .send<GetServiceCategoryByTypeQuery>();

  return res.data.getServiceCategoryByType;
};

export const useGetServiceFiltersQuery = (args: args) => {
  return useQuery(getServiceFiltersQueryKey(args), () =>
    getServiceFiltersQueryFetcher(args)
  );
};
