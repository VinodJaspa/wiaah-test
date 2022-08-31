import { currencices, orderStatus, payments, products } from "placeholder";
import { FormOptionType, OrdersFilter, OrdersStatus, PriceType } from "types";
import { randomNum } from "utils";

type OrderInfoData = {
  orderId: string;
  orderDeliveryStatus: OrdersStatus;
  orderDeliveryPricing: number;
  orderDeliveryDate: string;
  price: number;
  seller?: string;
  sellerId?: string;
  buyer?: string;
  buyerId?: string;
  orderName: string;
  payment: string;
  trackingLink: string;
};

const orders: OrderInfoData[] = [...Array(10)].map(() => ({
  seller: "seller name",
  sellerId: "132",
  orderDeliveryDate: new Date(Date.now()).toDateString(),
  orderId: `${randomNum(100000)}`,
  orderDeliveryStatus: orderStatus[randomNum(orderStatus.length)],
  orderDeliveryPricing: randomNum(50),
  orderName: products[randomNum(products.length)].name,
  payment: payments[randomNum(payments.length)],
  price: randomNum(500),
  buyer: "buyer name",
  buyerId: "1596",
  trackingLink: "test tracking link",
}));

export const GetOrdersHistoryFetcher = (filter: OrdersFilter) => {
  return filter === "all"
    ? orders
    : orders.filter((order) => order.orderDeliveryStatus === filter);
};
