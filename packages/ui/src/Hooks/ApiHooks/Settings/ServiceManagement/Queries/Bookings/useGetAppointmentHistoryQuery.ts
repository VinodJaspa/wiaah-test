import {
  BookingHistoryAppointmentType,
  FetchDataArrayResults,
  getBookingsHistoryFetcher,
  GetBookingsHistoryFetcherProps,
} from "api";
import { useQuery } from "react-query";

export const useGetBookingsHistoryQuery = (
  props: GetBookingsHistoryFetcherProps
) => {
  return useQuery<FetchDataArrayResults<BookingHistoryAppointmentType>>(
    "appointmentsHistory",
    () => getBookingsHistoryFetcher(props)
  );
};
