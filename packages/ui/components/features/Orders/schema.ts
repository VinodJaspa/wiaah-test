import { Account } from "@features/Accounts";
import { Product, ShippingAddress, ShippingRule } from "@features/Products";

type Maybe<T> = T | null;
type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type OrderItem = {
  __typename?: "OrderItem";
  id: Scalars["ID"];
  qty: Scalars["Int"];
  product?: Maybe<Product>;
};

export type OrderStatus = {
  __typename?: "OrderStatus";
  of: OrderStatusEnum;
  rejectReason?: Maybe<Scalars["String"]>;
};

export enum OrderStatusEnum {
  Pending = "pending",
  Paid = "paid",
  RejectedBySeller = "rejectedBySeller",
  RejectedByBuyer = "rejectedByBuyer",
  Shipping = "shipping",
  Compeleted = "compeleted",
}

export type Order = {
  __typename?: "Order";
  id: Scalars["ID"];
  sellerId: Scalars["ID"];
  seller?: Maybe<Account>;
  buyerId: Scalars["ID"];
  buyer?: Maybe<Account>;
  createdAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
  items: Array<OrderItem>;
  status: OrderStatus;
  shippingAddressId: Scalars["String"];
  shippingMethodId: Scalars["String"];
  paid: Scalars["Float"];
  shipping: ShippingRule;
  shippingAddress: ShippingAddress;
};

export type ReturnedOrder = {
  __typename?: "ReturnedOrder";
  id: Scalars["ID"];
  requestedById: Scalars["ID"];
  productId: Scalars["ID"];
  sellerId: Scalars["ID"];
  reason: Scalars["String"];
  type: RefundType;
  amount: Scalars["Float"];
  fullAmount: Scalars["Float"];
  status: RefundStatusType;
  rejectReason?: Maybe<Scalars["String"]>;
  product: Product;
};

export enum RefundType {
  Money = "money",
  Credit = "credit",
}

export enum RefundStatusType {
  Pending = "pending",
  Accept = "accept",
  Reject = "reject",
}

export type Query = {
  __typename?: "Query";
  getMyOrders: Array<Order>;
  getOrder: Order;
  getUserOrders: Array<Order>;
  getFilteredOrders: Array<Order>;
  getMyReturnedOrders: Array<ReturnedOrder>;
};

export type QueryGetMyOrdersArgs = {
  getMyOrdersArgs: GetMyOrdersInput;
};

export type QueryGetOrderArgs = {
  id: Scalars["String"];
};

export type QueryGetUserOrdersArgs = {
  args: GetUserOrders;
};

export type QueryGetFilteredOrdersArgs = {
  args: GetFilteredOrdersInput;
};

export type QueryGetMyReturnedOrdersArgs = {
  args: GetMyReturnedOrdersInput;
};

export type GetMyOrdersInput = {
  status?: Maybe<OrderStatusEnum>;
  pagination: GqlPaginationInput;
};

export type GqlPaginationInput = {
  page: Scalars["Int"];
  take: Scalars["Int"];
};

export type GetUserOrders = {
  q: Scalars["String"];
  status?: Maybe<OrderStatusEnum>;
  userId: Scalars["String"];
  accountType: Scalars["String"];
  pagination: GqlPaginationInput;
};

export type GetFilteredOrdersInput = {
  pagination: GqlPaginationInput;
  date_from: Scalars["String"];
  date_to: Scalars["String"];
  qty: Scalars["Int"];
  price: Scalars["Float"];
  buyer: Scalars["String"];
  seller: Scalars["String"];
  payment_method: Scalars["String"];
};

export type GetMyReturnedOrdersInput = {
  pagination: GqlPaginationInput;
};

export type Mutation = {
  __typename?: "Mutation";
  rejectReceivedOrder: Scalars["Boolean"];
  rejectRequestedOrder: Scalars["Boolean"];
  acceptRequestedOrder: Scalars["Boolean"];
  acceptReceivedOrder: Scalars["Boolean"];
  askForRefund: Scalars["Boolean"];
  acceptRefundRequest: Scalars["Boolean"];
  rejectRefundRequest: Scalars["Boolean"];
};

export type MutationRejectReceivedOrderArgs = {
  args: RejectReceivedOrderInput;
};

export type MutationRejectRequestedOrderArgs = {
  args: RejectRequestedOrderInput;
};

export type MutationAcceptRequestedOrderArgs = {
  args: AcceptRequestedOrderInput;
};

export type MutationAcceptReceivedOrderArgs = {
  args: AcceptReceivedOrderInput;
};

export type MutationAskForRefundArgs = {
  askForRefundArgs: AskForRefundInput;
};

export type MutationAcceptRefundRequestArgs = {
  id: Scalars["ID"];
};

export type MutationRejectRefundRequestArgs = {
  args: RejectRefundRequestInput;
};

export type RejectReceivedOrderInput = {
  id: Scalars["ID"];
  rejectReason: Scalars["String"];
};

export type RejectRequestedOrderInput = {
  id: Scalars["ID"];
  rejectReason: Scalars["String"];
};

export type AcceptRequestedOrderInput = {
  id: Scalars["ID"];
};

export type AcceptReceivedOrderInput = {
  id: Scalars["ID"];
};

export type AskForRefundInput = {
  id: Scalars["ID"];
  type: RefundType;
  fullAmount?: Maybe<Scalars["Boolean"]>;
  amount?: Maybe<Scalars["Float"]>;
  reason?: Maybe<Scalars["String"]>;
};

export type RejectRefundRequestInput = {
  id: Scalars["ID"];
  reason?: Maybe<Scalars["String"]>;
};
