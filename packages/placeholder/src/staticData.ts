import { OrdersStatus } from "types";

export const currencices: string[] = ["USD", "CHF", "EUR"];

export const payments: string[] = ["paypal", "credit card", "bank transfer"];

export const orderStatus: OrdersStatus[] = [
  "canceled",
  "completed",
  "continuing",
  "restitue",
];
