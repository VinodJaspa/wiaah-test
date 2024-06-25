import { useQuery, UseQueryOptions } from "react-query";
import { AsyncReturnType } from "types";
import {
  Order,
  OrderItem,
  ShippingRule,
  Product,
  ServicePaymentMethod,
  ShippingAddress,
} from "@features/API";

export const getOrderDetailsQueryKey = (props: { id: string }) => [
  "OrderDetails",
  props,
];
export type GetOrderDetailsQuery = { __typename?: "Query" } & {
  getOrderDetails: {
    order: Pick<Order, "id" | "createdAt"> & {
      orderItem: Pick<OrderItem, "discount"> & {
        products: Array<
          Pick<
            Product,
            | "id"
            | "colors"
            | "sizes"
            | "vat"
            | "price"
            | "cashback"
            | "discount"
            | "description"
            | "title"
            | "colors"
            | "shippingDetails"
            | "sizes"
            | "thumbnail"
          > &
          Pick<OrderItem, "qty">
        >;
      };
    } & {
      shipping: Pick<
        ShippingRule,
        "cost" | "deliveryTimeRange" | "destination" | "shippingType"
      > &
      Pick<ShippingAddress, "location">;
    };
    payment: { method: ServicePaymentMethod; value: number };
  };
};
export const getOrderDetailsFetcher = (orderId: string) => {
  // TODO
};

export const useGetOrderDetailsQuery = (
  id: string,
  options?: UseQueryOptions<
    GetOrderDetailsQuery, // Correct type for data
    unknown, // Type for error (you can define a custom error type if needed)
    AsyncReturnType<() => Promise<GetOrderDetailsQuery["getOrderDetails"]>>, // Return type of the fetcher function
    ReturnType<typeof getOrderDetailsQueryKey> // Type for query key
  >
) => {
  return useQuery<
    GetOrderDetailsQuery, // Type for the query data
    unknown, // Type for the error
    AsyncReturnType<() => Promise<GetOrderDetailsQuery["getOrderDetails"]>>, // Return type of the fetcher function
    ReturnType<typeof getOrderDetailsQueryKey> // Type for the query key
  >(getOrderDetailsQueryKey({ id }), options);
};
