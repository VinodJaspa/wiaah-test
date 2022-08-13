import {
  currencices,
  getRandomImage,
  orderStatus,
  payments,
} from "placeholder";
import { OrdersFilter, OrdersStatus, PriceType } from "types";
import { randomNum } from "utils";
import { FetchDataArrayResults } from "../../../../../";

export interface BookingHistoryAppointmentType {
  appointmentId: string;
  customer: {
    name: {
      first: string;
      last: string;
      fullName: string;
    };
    photo: string;
    id: string;
  };
  service: string;
  from: string;
  to: string;
  serviceStatus: OrdersStatus;
  servicePrice: PriceType;
  payment: string;
}
export type GetBookingsHistoryFetcherResults =
  FetchDataArrayResults<BookingHistoryAppointmentType>;

export type GetBookingsHistoryFetcherProps = {
  limit: number;
  page: number;
  filter: OrdersFilter;
};

export const getBookingsHistoryFetcher = ({
  limit,
  page,
  filter,
}: GetBookingsHistoryFetcherProps): GetBookingsHistoryFetcherResults => {
  const data = [...Array(30)].map((_, i) => ({
    appointmentId: `${randomNum(214343465)}`,
    customer: {
      id: `${i * 2}`,
      name: {
        first: "first",
        last: "last",
        fullName: "Wiaah Corp",
      },
      photo: getRandomImage(),
    },
    from: new Date(Date.now()).toString(),
    payment: payments[randomNum(payments.length)],
    service: "back pain treatment",
    servicePrice: {
      amount: randomNum(500),
      currency: currencices[randomNum(currencices.length)],
    },
    serviceStatus: orderStatus[randomNum(orderStatus.length)],
    to: new Date(Date.now()).toString(),
  }));
  const filteredData = filter
    ? filter === "all"
      ? data
      : data.filter((item) => item.serviceStatus === filter)
    : data;
  const appointmnets =
    page === 0
      ? filteredData.slice(0, limit)
      : filteredData.slice(page * limit, page + 1 * limit);
  return {
    total: data.length,
    data: appointmnets,
    hasMore: page * limit > data.length,
  };
};
