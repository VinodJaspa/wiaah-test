import { PaginationFetchedData } from "../../../../types/pagination";
import { AsyncReturnType } from "types";

type LatestOrderStatus = "refund" | "charge_black" | "paid";

export type AdminLatestOrderType = {
  date: Date;
  billingName: string;
  amount: number;
  status: LatestOrderStatus;
};

const status: LatestOrderStatus[] = ["charge_black", "paid", "refund"];

const recentOrders: {
  date: Date;
  billingName: string;
  amount: number;
  status: LatestOrderStatus;
}[] = [...Array(10)].map((_, i) => ({
  amount: 50,
  billingName: "user name",
  date: new Date(),
  status: status[status.length],
}));

export const getAdminLatestOrdersFetcher = async (): Promise<
  PaginationFetchedData<AdminLatestOrderType[]>
> => {
  const res: AsyncReturnType<typeof getAdminLatestOrdersFetcher> = {
    total: recentOrders.length,
    data: recentOrders,
    hasMore: true,
  };
  return res;
};
