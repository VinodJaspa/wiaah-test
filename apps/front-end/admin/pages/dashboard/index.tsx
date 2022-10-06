import { NextPage } from "next";
import React from "react";
import {
  AnalyticsCard,
  ShoppingBagOutlineIcon,
  DotIcon,
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
import { mapArray, randomNum } from "utils";
import { useTranslation } from "react-i18next";
import { useDateDiff } from "hooks";

type LatestOrderStatus = "Chargeback" | "Paid" | "Refund";

const Dashboard: NextPage = () => {
  const chartRef = React.useRef<HTMLDivElement>(null);
  const radialChartRef = React.useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const charData = [...Array(5)].map((_, i) => ({
    time: "10:00 AM",
    sellers: randomNum(50),
    buyers: randomNum(50),
  }));

  const totalProfit = 45813;

  const profitDetails: {
    pointName: string;
    pointPercentage: number;
    fill: string;
  }[] = [
    {
      pointName: t("Maintenace"),
      pointPercentage: 50,
      fill: "#fff",
    },
    {
      pointName: t("Giveaway"),
      pointPercentage: 60,
      fill: "#fff",
    },
    {
      pointName: t("Affiliate"),
      pointPercentage: 70,
      fill: "#fff",
    },
    {
      pointName: t("Ofline Sales"),
      pointPercentage: 80,
      fill: "#fff",
    },
  ];

  const recentSales: {
    buyer: {
      name: string;
      photo: string;
      id: string;
    };
    date: Date;
    price: number;
  }[] = [...Array(9)].map((_, i) => ({
    buyer: {
      id: i.toString(),
      name: "username",
      photo: `/profile (${i + 1}).jfif`,
    },
    date: new Date(),
    price: randomNum(400),
  }));

  const status: LatestOrderStatus[] = ["Chargeback", "Paid", "Paid", "Refund"];

  const recentOrders: {
    date: Date;
    billingName: string;
    amount: number;
    status: LatestOrderStatus;
  }[] = [...Array(10)].map((_, i) => ({
    amount: randomNum(50000),
    billingName: "user name",
    date: new Date(),
    status: status[randomNum(status.length)],
  }));

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 flex gap-16 flex-col">
        <div className="grid grid-cols-3 gap-4">
          <AnalyticsCard
            className="bg-indigo-200"
            amount={34000}
            icon={ShoppingBagOutlineIcon}
            incress={true}
            percentage={25}
            title={"total balance"}
          />
          <AnalyticsCard
            className="bg-neutral-200"
            amount={34000}
            icon={ShoppingBagOutlineIcon}
            incress={true}
            percentage={25}
            title={"total balance"}
          />
          <AnalyticsCard
            className="bg-orange-200"
            amount={34500}
            icon={ShoppingBagOutlineIcon}
            incress={true}
            percentage={25}
            title={"total balance"}
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
                recentOrders,
                ({ amount, billingName, date, status }, i) => (
                  <Tr key={i}>
                    <Td>
                      {new Date(date).toLocaleDateString(undefined, {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </Td>
                    <Td>{billingName}</Td>
                    <Td>
                      <PriceDisplay price={amount} />
                    </Td>
                    <Td>{status}</Td>

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
              {mapArray(profitDetails, ({ pointName, pointPercentage }, i) => (
                <div className="text-white list-item" key={i}>
                  <div className="flex flex-col gap-1">
                    <p className="whitespace-nowrap text-white text-opacity-70">
                      {pointName}
                    </p>
                    <p className="font-bold">{pointPercentage}%</p>
                  </div>
                </div>
              ))}
            </div>
            <div ref={radialChartRef} className="w-full">
              <AspectRatio ratio={1}>
                <div className="absolute text-white flex flex-col items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <p>{t("Total")}</p>
                  <PriceDisplay price={totalProfit} />
                </div>
                <RadialBarChart
                  width={radialChartRef.current?.getBoundingClientRect().width}
                  height={
                    radialChartRef.current?.getBoundingClientRect().height
                  }
                  innerRadius="25%"
                  outerRadius="100%"
                  data={[
                    {
                      pointName: "",
                      pointPercentage: 0,
                      fill: "#fff",
                    },
                    {
                      pointName: "",
                      pointPercentage: 100,
                      fill: "rgba(0,0,0,0)",
                    },
                  ].concat(profitDetails)}
                  startAngle={450}
                  //   barGap={16}
                  endAngle={90}
                  barSize={4}
                  //   barCategoryGap={16}
                >
                  <RadialBar dataKey="pointPercentage"></RadialBar>
                  {/* <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" /> */}
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
          {mapArray(recentSales, ({ buyer, date, price }, i) => {
            const { getSince } = useDateDiff({ from: date, to: new Date() });

            const since = getSince();
            return (
              <div key={i} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <Avatar src={buyer.photo} alt={buyer.name} />
                  <div className="flex flex-col gap-1">
                    <p className="font-bold">{buyer.name}</p>
                    <p>
                      {since.value} {since.timeUnit} {t("ago")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center font-bold text-lg">
                  +
                  <PriceDisplay price={price} />
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
