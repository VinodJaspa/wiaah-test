import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";

export const getOrderDetailsQueryKey = (props: { id: string }) => [
  "OrderDetails",
  props,
];

export const getOrderDetailsFetcher = async (orderId: string) => {
  // TODO
};

export const useGetOrderDetailsQuery = (
  id: string,
  options?: UseQueryOptions<
    unknown,
    unknown,
    AsyncReturnType<typeof getOrderDetailsFetcher>,
    any
  >
) => {
  return useQuery(
    getOrderDetailsQueryKey({ id }),
    () => getOrderDetailsFetcher(id),
    options
  );
};
