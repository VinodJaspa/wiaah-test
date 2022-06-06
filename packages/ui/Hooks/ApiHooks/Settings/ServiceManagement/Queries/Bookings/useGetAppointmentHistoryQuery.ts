import { getBookingsHistoryFetcher } from "api";
import { useQuery } from "react-query";

export const useGetBookingsHistoryQuery = () => {
  return useQuery("appointmentsHistory", getBookingsHistoryFetcher);
};
