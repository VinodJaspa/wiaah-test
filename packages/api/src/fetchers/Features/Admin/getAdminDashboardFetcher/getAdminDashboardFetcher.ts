import { AsyncReturnType } from "types";
import { randomNum } from "utils";

type AnalyticsData = {
  amount: number;
  changePercent: number;
  incress: boolean;
};

export type AnalyticsProfit = {
  title: string;
  percent: number;
};

export type AdminDashboardData = {
  generalAnalytics: {
    totalBalance: AnalyticsData;
    totalExpenses: AnalyticsData;
    totalProfit: AnalyticsData;
  };
  monthlyProfit: {
    total: number;
    totalGrowth: number;
    profitAnalytics: AnalyticsProfit[];
  };
};

export const getAdminDashboardFetcher =
  async (): Promise<AdminDashboardData> => {
    const res: AsyncReturnType<typeof getAdminDashboardFetcher> = {
      generalAnalytics: {
        totalBalance: {
          amount: randomNum(50000),
          changePercent: randomNum(50),
          incress: randomNum(10) > 7,
        },
        totalExpenses: {
          amount: randomNum(50000),
          changePercent: randomNum(50),
          incress: randomNum(10) > 7,
        },
        totalProfit: {
          amount: randomNum(50000),
          changePercent: randomNum(50),
          incress: randomNum(10) > 7,
        },
      },
      monthlyProfit: {
        profitAnalytics: [
          {
            title: "Maintenace",
            percent: 50,
          },
          {
            title: "Giveaway",
            percent: 60,
          },
          {
            title: "Affiliate",
            percent: 70,
          },
          {
            title: "Ofline Sales",
            percent: 80,
          },
        ],
        total: 154,
        totalGrowth: 25,
      },
    };
    return res;
  };
