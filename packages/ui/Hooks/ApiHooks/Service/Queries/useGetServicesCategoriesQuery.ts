import { getServicesCategoriesFetcher } from "api";
import { useQuery } from "react-query";

export const useGetServicesCategoriesQuery = (take: number, page: number) => {
  return useQuery(["service_categories", { take, page }], () => {
    return getServicesCategoriesFetcher(take, page);
  });
};
