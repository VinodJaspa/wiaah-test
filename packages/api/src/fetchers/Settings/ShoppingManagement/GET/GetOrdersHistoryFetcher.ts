import { currencices, orderStatus, payments, products } from "placeholder";
import { FormOptionType, OrdersFilter, OrdersStatus, PriceType } from "types";
import { randomNum } from "utils";

type OrderInfoData = {
  orderId: string;
  orderDeliveryStatus: OrdersStatus;
  orderDeliveryPricing: PriceType;
  orderDeliveryDate: string;
  customer: string;
  orderName: string;
  payment: string;
};

const orders: OrderInfoData[] = [...Array(10)].map(() => ({
  customer: "customer",
  orderDeliveryDate: new Date(Date.now()).toDateString(),
  orderId: `${randomNum(100000)}`,
  orderDeliveryStatus: orderStatus[randomNum(orderStatus.length)],
  orderDeliveryPricing: {
    amount: randomNum(500),
    currency: currencices[randomNum(currencices.length)],
  },
  orderName: products[randomNum(products.length)].name,
  payment: payments[randomNum(payments.length)],
}));

export const GetOrdersHistoryFetcher = (filter: OrdersFilter) => {
  return filter === "all"
    ? orders
    : orders.filter((order) => order.orderDeliveryStatus === filter);
};
