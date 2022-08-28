import { currencices, orderStatus, payments, products } from "placeholder";
import { FormOptionType, OrdersFilter, OrdersStatus, PriceType } from "types";
import { randomNum } from "utils";

type OrderInfoData = {
  orderId: string;
  orderDeliveryStatus: OrdersStatus;
  orderDeliveryPricing: number;
  orderDeliveryDate: string;
  price: number;
  customer: string;
  orderName: string;
  payment: string;
};

const orders: OrderInfoData[] = [...Array(10)].map(() => ({
  customer: "customer",
  orderDeliveryDate: new Date(Date.now()).toDateString(),
  orderId: `${randomNum(100000)}`,
  orderDeliveryStatus: orderStatus[randomNum(orderStatus.length)],
  orderDeliveryPricing: randomNum(50),
  orderName: products[randomNum(products.length)].name,
  payment: payments[randomNum(payments.length)],
  price: randomNum(500),
}));

export const GetOrdersHistoryFetcher = (filter: OrdersFilter) => {
  return filter === "all"
    ? orders
    : orders.filter((order) => order.orderDeliveryStatus === filter);
};
