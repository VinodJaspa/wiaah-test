import { PaginationFetchedData } from "@types";
import { AsyncReturnType } from "types";
import { randomNum } from "utils";

export type AdminRecentOrderType = {
  buyer: {
    name: string;
    photo: string;
    id: string;
  };

  date: Date;
  price: number;
};

const recentSales: AdminRecentOrderType[] = [...Array(9)].map((_, i) => ({
  buyer: {
    id: i.toString(),
    name: "username",
    photo: `/profile (${i + 1}).jfif`,
  },
  date: new Date(),
  price: randomNum(400),
}));

export const getAdminRecentSalesFetcher = async (): Promise<
  PaginationFetchedData<AdminRecentOrderType[]>
> => {
  const res: AsyncReturnType<typeof getAdminRecentSalesFetcher> = {
    data: recentSales,
    hasMore: false,
    total: 0,
  };

  return res;
};
