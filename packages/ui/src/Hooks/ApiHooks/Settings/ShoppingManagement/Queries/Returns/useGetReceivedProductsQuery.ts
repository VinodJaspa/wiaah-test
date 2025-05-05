import { useQuery, UseQueryOptions } from "react-query";
import { GetReceivedProductsFetcher } from "api";
import { queryOptions } from "../../../../utils";
import { ProductDetails } from "types";

export const useGetReceivedProductsQuery = (
  opts?: Omit<UseQueryOptions<ProductDetails[], any, ProductDetails[], "ReceivedProductsQuery">, "queryKey" | "queryFn">
) => {
  return useQuery("ReceivedProductsQuery", GetReceivedProductsFetcher, opts);
};
