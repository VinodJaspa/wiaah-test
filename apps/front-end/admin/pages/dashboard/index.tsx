import { NextPage } from "next";
import React from "react";
import {
  AnalyticsCard,
  ShoppingBagOutlineIcon,
  AspectRatio,
  PriceDisplay,
  HorizontalDotsIcon,
  Avatar,
  Table,
  THead,
  Th,
  TBody,
  Tr,
  Td,
  DownloadIcon,
  Button,
  useGetAdminDashboardData,
  useAdminGetLatestOrdersQuery,
  useGetRecentSellers,
  useGetRecentBuyers,
  useGetAdminRecentSalesQuery,
} from "ui";
import {
  Area,
  AreaChart,
  RadialBar,
  RadialBarChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  getDatesInRangeHours,
  mapArray,
  randomNum,
  SnakeCaseToText,
  SubtractFromDate,
} from "utils";
import { useTranslation } from "react-i18next";
import { useDateDiff, useResponsive } from "hooks";

const Dashboard: NextPage = () => {
  useResponsive();
  const chartRef = React.useRef<HTMLDivElement>(null);
  const radialChartRef = React.useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const { data: _analyticsData } = useGetAdminDashboardData();
  const analyticsData = FAKE_ANALYTICS;

  const { data: _recentSales } = useGetAdminRecentSalesQuery(10);
  const recentSales = FAKE_RECENT_SALES;
  const { data: latestOrders } = useAdminGetLatestOrdersQuery(10);
  const { data: recentSellers } = useGetRecentSellers(
    { page: 1, take: 100000 },
    SubtractFromDate(new Date(), { hours: 12 })
  );

  const { data: recentBuyers } = useGetRecentBuyers(
    { page: 1, take: 100000 },
    SubtractFromDate(new Date(), { hours: 12 })
  );

  const accounts = [...(recentBuyers || []), ...(recentSellers || [])];

  const dateSorted = accounts.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  const dates = getDatesInRangeHours(
    new Date(accounts[0]?.createdAt),
    new Date(accounts[accounts.length - 1]?.createdAt)
  );

  const GetDurationFromDateDiffHook = (createdAt: string) => {
    const { getSince } = useDateDiff({
      from: new Date(createdAt),
      to: new Date(),
    });
    return getSince();
  };

  const charData = dates.reduce((acc, curr, idx, arr) => {
    const from = curr;
    const to = arr[idx + 1] || new Date();

    return [
      ...acc,
      {
        time: `${from.toLocaleTimeString("en-us", {
          timeStyle: "short",
        })} - ${to.toLocaleTimeString("en-us", {
          timeStyle: "short",
        })}`,
        sellers: randomNum(10),
        // recentSellers.filter(
        //   (v) => new Date(v.createdAt) >= from && new Date(v.createdAt) <= to
        // ).length,
        buyers: randomNum(10),
        // recentBuyers.filter(
        //   (v) => new Date(v.createdAt) >= from && new Date(v.createdAt) <= to
        // ).length,
      },
    ];
  }, [] as { time: string; sellers: number; buyers: number }[]);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 flex gap-16 flex-col">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          <AnalyticsCard
            className="bg-indigo-200"
            amount={analyticsData?.generalAnalytics.totalBalance.amount}
            icon={<ShoppingBagOutlineIcon />}
            increase={analyticsData?.generalAnalytics.totalBalance.incress}
            percentage={
              analyticsData?.generalAnalytics.totalBalance.changePercent
            }
            title={"Total Balance"}
          />
          <AnalyticsCard
            className="bg-neutral-200"
            amount={analyticsData?.generalAnalytics.totalExpenses.amount}
            icon={<ShoppingBagOutlineIcon />}
            increase={analyticsData?.generalAnalytics.totalExpenses.incress}
            percentage={
              analyticsData?.generalAnalytics.totalExpenses.changePercent
            }
            title={"Total Expenses"}
          />
          <AnalyticsCard
            className="bg-orange-200"
            amount={analyticsData?.generalAnalytics.totalProfit.amount}
            icon={<ShoppingBagOutlineIcon />}
            increase={analyticsData?.generalAnalytics.totalProfit.incress}
            percentage={
              analyticsData?.generalAnalytics.totalProfit.changePercent
            }
            title={"Total Profit"}
          />
        </div>
        <div ref={chartRef} className="w-full h-96">
          <AreaChart
            width={chartRef.current?.getBoundingClientRect().width}
            height={chartRef.current?.getBoundingClientRect().height}
            data={charData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>{" "}
            <Tooltip />
            <Area
              type="monotone"
              dataKey="sellers"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="buyers"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
            <XAxis dataKey={"time"} />
            <YAxis dataKey={"sellers"} />
          </AreaChart>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center px-4">
            <p className="text-xl font-bold">{t("Latest Orders")}</p>
            <div className="flex gap-2 items-center">
              <p className="text-grayText">{t("Data Updates Every 3 Hours")}</p>
              <Button>{t("Voew All Orders")}</Button>
            </div>
          </div>
          <Table
            ThProps={{ align: "left", className: "text-grayText" }}
            TdProps={{ className: "font-bold" }}
            className="w-full"
          >
            <THead>
              <Th>{t("Date")}</Th>
              <Th>{t("Billing Name")}</Th>
              <Th>{t("Amount")}</Th>
              <Th>{t("Status")}</Th>
              <Th align="right">{t("Invocie")}</Th>
            </THead>
            <TBody>
              {mapArray(
                latestOrders,
                ({ billing, createdAt, paid, status }, i) => (
                  <Tr key={i}>
                    <Td>
                      {new Date(createdAt).toLocaleDateString(undefined, {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </Td>
                    <Td>{billing.firstName}</Td>
                    <Td>
                      <PriceDisplay price={paid} />
                    </Td>
                    <Td>{SnakeCaseToText(status.of)}</Td>

                    <Td align="center">
                      <DownloadIcon />
                    </Td>
                  </Tr>
                )
              )}
            </TBody>
          </Table>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div className="bg-primary flex flex-col gap-4 p-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-white">{t("Monthly Profits")}</p>
              <p className="text-white text-opacity-70">
                {t("Total Profit Growth Of")}25%
              </p>
            </div>
            <HorizontalDotsIcon className="text-white" />
          </div>
          <div className="flex gap-8 justify-between">
            <div className="flex list-disc flex-col gap-2">
              {mapArray(
                analyticsData?.monthlyProfit.profitAnalytics,
                ({ percent, title }, i) => (
                  <div className="text-white list-item" key={i}>
                    <div className="flex flex-col gap-1">
                      <p className="whitespace-nowrap text-white text-opacity-70">
                        {title}
                      </p>
                      <p className="font-bold">{percent}%</p>
                    </div>
                  </div>
                )
              )}
            </div>
            <div ref={radialChartRef} className="w-full">
              <AspectRatio ratio={1}>
                <div className="absolute text-white flex flex-col items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <p>{t("Total")}</p>
                  <PriceDisplay price={analyticsData?.monthlyProfit.total} />
                </div>
                <RadialBarChart
                  width={radialChartRef.current?.getBoundingClientRect().width}
                  height={
                    radialChartRef.current?.getBoundingClientRect().height
                  }
                  innerRadius="25%"
                  outerRadius="100%"
                  data={[
                    { percent: 0, title: "" },
                    { percent: 100, title: "", fill: "rgba(0,0,0,0)" },
                  ].concat(
                    analyticsData?.monthlyProfit.profitAnalytics.map((v) => ({
                      ...v,
                      fill: "#fff",
                    })) || []
                  )}
                  startAngle={450}
                  endAngle={90}
                  barSize={4}
                >
                  <RadialBar dataKey="percent"></RadialBar>
                  <Tooltip />
                </RadialBarChart>
              </AspectRatio>
            </div>
          </div>
        </div>

        <div className="flex flex-col px-8 gap-8">
          <div className="justify-between flex items-center">
            <p className="font-bold text-lg">{t("Recent Sales")}</p>
            <p className="font-semibold">{t("See All")}</p>
          </div>
          {mapArray(recentSales, ({ buyer, createdAt, id, paid }, i) => {
            const since = GetDurationFromDateDiffHook(createdAt);
            return (
              <div key={i} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <Avatar src={buyer.photo} alt={buyer.firstName} />
                  <div className="flex flex-col gap-1">
                    <p className="font-bold">{buyer.firstName}</p>
                    <p>
                      {since.value} {since.timeUnit} {t("ago")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center font-bold text-lg">
                  +
                  <PriceDisplay price={paid} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

const FAKE_ANALYTICS = {
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

const FAKE_RECENT_SALES = [
  {
    __typename: "OrderItem",
    id: "orderItem1",
    paid: 44,
    createdAt: "2024-07-12T10:00:00Z",
    buyer: {
      __typename: "Account",
      firstName: "John",
      lastName: "Doe",
      photo: "https://example.com/photos/john.jpg",
    },
  },
  {
    __typename: "OrderItem",
    id: "orderItem2",
    paid: 432,
    createdAt: "2024-07-11T15:30:00Z",
    buyer: {
      __typename: "Account",
      firstName: "Jane",
      lastName: "Smith",
      photo: "https://example.com/photos/jane.jpg",
    },
  },
];
