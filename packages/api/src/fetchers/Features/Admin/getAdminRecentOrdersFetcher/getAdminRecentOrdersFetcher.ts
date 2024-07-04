import { PaginationFetchedData } from "../../../../types/pagination";
import { AsyncReturnType } from "types";

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
  price: 400,
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
