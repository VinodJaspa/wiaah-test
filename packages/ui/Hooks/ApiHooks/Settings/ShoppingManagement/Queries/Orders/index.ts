import { useQuery } from "react-query";
import { OrdersFilter } from "types";

import { GetOrdersHistoryFetcher } from "api";
export const useGetOrdersHistoryQuery = (filter: OrdersFilter = "all") => {
  return useQuery(["ordersHistory", filter], () =>
    GetOrdersHistoryFetcher(filter)
  );
};
