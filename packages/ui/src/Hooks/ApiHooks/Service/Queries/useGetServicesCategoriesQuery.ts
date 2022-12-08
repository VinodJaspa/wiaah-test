import { getServicesCategoriesFetcher, QueryPaginationInputs } from "api";
import { useQuery } from "react-query";

export const useGetServicesCategoriesQuery = (
  pagination: QueryPaginationInputs
) => {
  return useQuery(["service_categories", { pagination }], () => {
    return getServicesCategoriesFetcher(pagination);
  });
};
