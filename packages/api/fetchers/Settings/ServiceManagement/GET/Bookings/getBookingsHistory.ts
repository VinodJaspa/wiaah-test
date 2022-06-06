import {
  currencices,
  getRandomImage,
  orderStatus,
  payments,
} from "placeholder";
import { OrdersStatus, PriceType } from "types";
import { randomNum } from "utils";

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

export const getBookingsHistoryFetcher =
  (): BookingHistoryAppointmentType[] => {
    return [...Array(30)].map((_, i) => ({
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
  };
