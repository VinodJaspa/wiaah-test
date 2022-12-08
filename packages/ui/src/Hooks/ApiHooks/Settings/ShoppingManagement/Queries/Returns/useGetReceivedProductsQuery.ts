import { useQuery } from "react-query";
import { GetReceivedProductsFetcher } from "api";
import { queryOptions } from "../../../../utils";
import { ProductDetails } from "types";

export const useGetReceivedProductsQuery = (
  opts?: queryOptions<any, any, ProductDetails[]>
) => {
  return useQuery("ReceivedProductsQuery", GetReceivedProductsFetcher, opts);
};
