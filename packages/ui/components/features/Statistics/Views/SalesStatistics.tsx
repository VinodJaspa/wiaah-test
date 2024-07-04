import {
  NumberShortner,
  calculateAmountPercentChange,
  mapArray,
  runIfFn,
} from "utils";
import {
  Divider,
  EyeIcon,
  HStack,
  HexagonStatsIcon,
  Image,
  PaperShoppingBagOutlineIcon,
  PersonGroupIcon,
  PriceConverter,
  PriceDisplay,
  ReturnArrowIcon,
  Select,
  SelectOption,
} from "@partials";
import { useUserData } from "@src/index";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { random } from "lodash";
import { ServiceType } from "@features/API";
import { PieChart } from "recharts";
import { startCase } from "lodash";
import { useResponsive } from "@UI/../hooks";
import { randomNum } from "@UI/components/helpers";

export function getRandomHotelRoomName(): string {
  const adjectives = ["Luxurious", "Spacious", "Cozy", "Elegant", "Charming"];
  const nouns = ["Suite", "Room", "Penthouse", "Loft", "Studio"];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective} ${randomNoun}`;
}

const services: {
  name: string;
  type: ServiceType;
  price: number;
  discount: number;
  earning: number;
  views: number;
  status: "compeleted" | "available";
}[] = [...Array(20)].map((_, i) => ({
  name: getRandomHotelRoomName(),
  discount: randomNum(100),
  earning: randomNum(20000),
  price: 180,
  status: randomNum(100) > 50 ? "compeleted" : "available",
  type: ServiceType.Hotel,
  views: randomNum(10000),
}));

const recentOrders: {
  thumbnail: string;
  name: string;
  createdAt: string;
  qty: number;
  price: number;
}[] = [...Array(20)].map(() => ({
  thumbnail:
    "https://static01.nyt.com/images/2019/03/24/travel/24trending-shophotels1/24trending-shophotels1-superJumbo.jpg",
  createdAt: new Date().toString(),
  name: getRandomHotelRoomName(),
  price: randomNum(500),
  qty: randomNum(5),
}));

const customerStats: {
  name: string;
  value: number;
  color: string;
  total: number;
}[] = [
    {
      name: "New Customer",
      color: "#118AB2",
      value: 200,
      total: 1000,
    },
    {
      name: "Current Customer",
      color: "#FFD166",
      value: 400,
      total: 1000,
    },
    {
      name: "Retargeted Cystiner (Coming soon)",
      color: "#00E1E1",
      value: 400,
      total: 1000,
    },
  ];

export const SalesStatistics: React.FC<{
  accountId: string;
}> = ({ accountId }) => {
  const { t } = useTranslation();
  const ref = React.useRef<HTMLDivElement>(null);
  const [salesChartDims, setChartDims] = React.useState<{
    w: number;
    h: number;
  }>({
    h: 0,
    w: 0,
  });
  const { isMobile } = useResponsive();

  React.useEffect(() => {
    const w = ref.current?.getBoundingClientRect().width;
    const h = ref.current?.getBoundingClientRect().height;
    console.log("resize", { h, w });

    if (w && h) {
      setChartDims({ h, w });
    }
  }, [ref, isMobile]);

  const salesStatistics = [...Array(52)].map((_, i) => ({
    month: new Date(
      new Date().getFullYear(),
      0,
      i * 7 + 1,
      1
    ).toLocaleDateString("en-us", {
      month: "short",
    }),
    date: new Date(new Date().getFullYear(), 0, i * 7 + 1, 1),
    showPeriod: "month",
    amount: random(0, 20000),
  }));

  const data = [
    { name: "Fashion", value: 600 },
    { name: "Cloths", value: 200 },
    { name: "Electronics", value: 250 },
    { name: "Health", value: 200 },
  ];

  const COLORS = ["#00E1E1", "#8811B2", "#00C999", "#118AB2"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    payload,
    startAngle,
    endAngle,
    ...rest
  }: any) => {
    const space = Math.abs((Math.abs(endAngle - startAngle) - 360) / 360) * 0.9;

    const radius =
      innerRadius + (outerRadius - innerRadius) * (space < 0.9 ? space : 0.9);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const name = payload.payload.name;

    return (
      <>
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={"middle"}
          dominantBaseline="central"
          fontWeight={"700"}
          fontSize={`${space > 0.7 ? 0.8 : space > 0.5 ? 1.2 : space > 0.2 ? 1.5 : 1.5
            }rem`}
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
        <text
          x={x}
          y={y - (1 - space) * 55}
          fill="white"
          textAnchor={space < 0.9 ? "middle" : "end"}
          // fontWeight={""}
          fontSize={`${space > 0.7 ? 0.8 : space > 0.5 ? 1.2 : space > 0.2 ? 1.5 : 1.5
            }rem`}
          dominantBaseline="central"
        >
          {name}
        </text>
      </>
    );
  };

  const isPayPerClick = false;
  const isProductShop = false;

  return (
    <div
      style={{
        gridTemplateColumns: "repeat(16,1fr)",
      }}
      className="grid gap-6 pb-16"
    >
      {/* overview stats */}
      <div className="flex flex-col col-span-9 gap-6">
        <HStack className="justify-end gap-6">
          <HStack>
            <p>{t("Day")}:</p>
            <Select>
              <SelectOption value={null}>{t("Select")}</SelectOption>
            </Select>
          </HStack>
          <HStack>
            <p>{t("Month")}:</p>
            <Select>
              <SelectOption value={null}>{t("Select")}</SelectOption>
            </Select>
          </HStack>
          <HStack>
            <p>{t("year")}:</p>
            <Select>
              <SelectOption value={null}>{t("Select")}</SelectOption>
            </Select>
          </HStack>
        </HStack>
        <div className="gap-7 grid grid-cols-4">
          <SalesStatisticsCard
            amount={25000}
            lastCycleAmount={30000}
            label="Sales"
            lastCycleLabel="last year"
            icon={<HexagonStatsIcon className="text-2xl min-w-fit" />}
          />

          <SalesStatisticsCard
            amount={25000}
            lastCycleAmount={30000}
            label="Purchase"
            lastCycleLabel="last year"
            icon={
              <PaperShoppingBagOutlineIcon className="text-2xl min-w-fit" />
            }
          />

          <SalesStatisticsCard
            amount={25000}
            lastCycleAmount={30000}
            label="Return"
            lastCycleLabel="last year"
            icon={<ReturnArrowIcon className="text-2xl min-w-fit" />}
            reverse
          />

          <SalesStatisticsCard
            amount={25000}
            lastCycleAmount={30000}
            label="Affiliation"
            lastCycleLabel="last year"
            icon={<PersonGroupIcon className="text-2xl min-w-fit" />}
          />
        </div>

        <div className="flex flex-col gap-12 w-full h-[25.813rem] p-4 bg-white overflow-hidden rounded-[0.625rem] shadow">
          <HStack className="justify-between">
            <p className="font-medium text-[1.375rem]">
              {t("Sales Statistics")}
            </p>
            <div className="w-fit">
              <Select>
                <SelectOption value={"week"}>{t("Weekly")}</SelectOption>
                <SelectOption value={"month"}>{t("Monthly")}</SelectOption>
                <SelectOption value={"year"}>{t("Yearly")}</SelectOption>
              </Select>
            </div>
          </HStack>
          <div ref={ref} className="w-full h-80">
            <AreaChart
              width={salesChartDims.w}
              height={salesChartDims.h}
              data={salesStatistics}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#20ECA7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                tick={<CustomXAxisTick />}
                tickLine={false}
                axisLine={false}
                interval={4}
                dataKey="month"
              />
              <YAxis
                tickMargin={20}
                tick={<CustomYAxisTick />}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                dataKey="amount"
                stroke="#06D6A0"
                fillOpacity={1}
                fill="url(#colorPv)"
              />
            </AreaChart>
          </div>
        </div>

        <div className="h-[30.563rem] rounded-[0.625rem] bg-white overflow-hidden">
          <div className="flex flex-col w-full  gap-4 ">
            <div className="px-4 flex flex-col w-full gap-4">
              <p className="font-semibold text-[1.375rem]">
                {isProductShop ? t("Products") : t("Services")}
              </p>
              {isPayPerClick ? (
                <div className="w-full grid grid-cols-6">
                  <p>{t("Image")}</p>
                  <p>{t("Clicks")}</p>
                  <p>{t("Product")}</p>
                  <p>{t("Price")}</p>
                  <p>{t("Link")}</p>
                  <p>{t("Click cost")}</p>
                </div>
              ) : (
                <div className="w-full grid grid-cols-8 font-semibold">
                  <p className="col-span-2">
                    {isProductShop ? t("Product") : t("Service")}
                  </p>
                  <p className="text-center">{t("Category")}</p>
                  <p className="text-center">{t("Price")}</p>
                  <p className="text-center">{t("Discount")}</p>
                  <p className="text-center">{t("Total earning")}</p>
                  <p className="text-center">{t("Views")}</p>
                  <p className="text-center">{t("Status")}</p>
                </div>
              )}
            </div>
          </div>
          <Divider />
          <div className="px-4 w-full gap-4 font-medium grid grid-cols-8 h-full overflow-y-scroll pr-2 thinScroll">
            {!isPayPerClick
              ? mapArray(services, (v, i) => (
                <React.Fragment key={i}>
                  <p className="text-xl col-span-2 font-semibold">{v.name}</p>
                  <p className="items-center flex justify-center">
                    {startCase(v.type)}
                  </p>
                  <div className="flex flex-col items-center justify-center">
                    <HStack className="gap-0">
                      <PriceDisplay
                        className="flex items-center justify-center"
                        price={v.price}
                        compact
                        decimel
                      />
                      /
                    </HStack>
                    <p className="text-[#8A8A8A] text-xs">{t("Night")}</p>
                  </div>
                  <PriceDisplay
                    className="flex items-center justify-center"
                    price={v.discount}
                    compact
                    decimel
                  />
                  <PriceDisplay
                    className="flex items-center justify-center"
                    price={v.earning}
                    compact
                    decimel
                  />
                  <HStack className="text-center">
                    <EyeIcon />
                    <p>{NumberShortner(v.views)}</p>
                  </HStack>
                  <p
                    style={{
                      color: v.status === "compeleted" ? "red" : "green",
                    }}
                    className="flex text-xs items-center justify-center"
                  >
                    {startCase(v.status)}
                  </p>
                </React.Fragment>
              ))
              : mapArray([], () => (
                <React.Fragment>
                  <Image />
                  <p>0</p>
                  <p>product name</p>
                  <PriceDisplay price={0} />
                  <p>link</p>
                  <PriceDisplay price={0} />
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col col-span-7 gap-6">
        {/* customer/selling category stats */}
        <div className="h-[16.688rem] flex flex-col shadow gap-4 p-4 w-full rounded-[0.625rem] bg-white overflow-hidden">
          <p className="font-bold text-[1.375rem]">{t("Customer Statics")}</p>

          <p>{t("Information about your customer")}</p>
          <div className="flex flex-col gap-3 w-full">
            {mapArray(customerStats, (v, i) => (
              <PercentBar
                key={i}
                color={v.color}
                total={v.total}
                value={v.value}
              />
            ))}
          </div>
          <div className="flex gap-x-6 flex-wrap">
            {mapArray(customerStats, (v, i) => (
              <HStack key={i}>
                <HStack className="gap-1">
                  <div
                    style={{ backgroundColor: v.color }}
                    className="w-4 h-4 rounded"
                  ></div>
                  <p style={{ color: v.color }} className="text-sm font-medium">
                    {(v.value / v.total) * 100}%
                  </p>
                </HStack>
                <p className="font-medium text-lg">{v.name}</p>
              </HStack>
            ))}
          </div>
        </div>

        {/* services/products stats */}
        <div className="h-[19.813rem] shadow rounded-[0.625rem] p-4 bg-white overflow-hidden">
          <HStack className="justify-between">
            <p className="font-semibold text-[1.375rem]">
              {t("Top Selling Category")}
            </p>
            <div className="w-fit">
              <Select>
                <SelectOption value={"week"}>{t("Weekly")}</SelectOption>
              </Select>
            </div>
          </HStack>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={236} height={236}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* recent orders */}
        <div className="h-[32rem] px-4 rounded-[0.625rem] bg-white overflow-hidden">
          <p className="font-semibold  text-[1.375rem]">
            {isProductShop ? t("Recent Clicks") : t("Recent Orders")}
          </p>
          <Divider />
          <div className="flex flex-col overflow-y-scroll pr-2 h-full thinScroll gap-6">
            {mapArray(recentOrders, (v, i) => (
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Image
                    src={v.thumbnail}
                    className="w-[4.375rem] h-[3.125rem] rounded"
                  />
                  <div className="flex flex-col">
                    <p className="font-semibold text-[1.063rem]">{t(v.name)}</p>
                    <p className="text-xs text-[#8A8A8A]">
                      {new Date(v.createdAt).toDateString()}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-16 w-1/3">
                  <div className="flex justify-center items-center font-semibold">
                    {v.qty}X
                  </div>
                  <div className="flex justify-end font-semibold text-sm">
                    <PriceDisplay price={v.price} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const CustomYAxisTick = (props: any) => {
  const { x, y, payload } = props;
  const v = PriceConverter({
    amount: payload.value,
    symbol: true,
    compact: true,
  });

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fontWeight={"600"}
        fontSize={"15"}
        fill="#666"
      >
        {v}
      </text>
    </g>
  );
};

export const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fontWeight={"600"}
        fontSize={"15"}
        fill="#666"
      >
        {payload.value}
      </text>
    </g>
  );
};

export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload) {
    const date = payload[0]?.payload.date;
    const period = payload[0]?.payload.showPeriod;

    const start = new Date(date);
    const end = new Date(new Date(date).setDate(new Date(date).getDate() + 7));

    return (
      <div className="font-medium text-[0.938rem] bg-white border shadow px-2 py-1 flex gap-1 items-center">
        <PriceDisplay decimel={false} compact price={payload[0]?.value} />
        <p className="text-[#646464] text-xs">
          {"("}
          {start.toLocaleDateString("en-us", {
            month: "short",
            day: "2-digit",
          })}
          -
          {end.toLocaleDateString("en-us", {
            month: "short",
            day: "2-digit",
          })}
          {")"}
        </p>
      </div>
    );
  }

  return null;
};

export const SalesStatisticsCard: React.FC<{
  amount: number;
  label: string;
  icon: React.ReactNode;
  lastCycleAmount: number;
  lastCycleLabel: string;
  reverse?: boolean;
}> = ({
  amount,
  icon: Icon,
  label,
  lastCycleAmount,
  lastCycleLabel,
  reverse = false,
}) => {
    const { t } = useTranslation();
    const [percent, isPositive] = calculateAmountPercentChange(
      amount,
      lastCycleAmount
    );

    return (
      <div className="flex flex-col gap-3 px-3 py-[0.625rem] rounded-lg bg-white overflow-hidden shadow">
        <HStack>
          {runIfFn(Icon)}
          <p className="font-medium">{label}</p>
        </HStack>

        <HStack className="justify-between">
          <span className="font-medium">
            <PriceDisplay price={amount} decimel />
          </span>

          <span
            className={`text-xs font-medium ${isPositive
                ? reverse
                  ? "text-[#FF0000]"
                  : "text-primary"
                : reverse
                  ? "text-primary"
                  : "text-[#FF0000]"
              }`}
          >
            {isPositive ? "+" : "-"}
            {percent.toFixed(2)}%
          </span>
        </HStack>

        <p className="text-[0.688rem] flex-wrap leading-3 flex gap-1 text-[#87888C]">
          <p>{t("Compared to")}</p>
          <span className="inline">
            <PriceDisplay price={lastCycleAmount} />
          </span>
          <p className="inline">{`(${lastCycleLabel})`}</p>
        </p>
      </div>
    );
  };

export const MySalesStatistics: React.FC = () => {
  const { user } = useUserData();

  return user ? <SalesStatistics accountId={user.id} /> : null;
};

export const PercentBar: React.FC<{
  value: number;
  total: number;
  color: string;
}> = ({ color, total, value }) => {
  const percent = value / total;

  return (
    <HStack>
      <p className="font-medium">0%</p>
      <div className="relative w-full">
        <div
          className={`absolute h-[0.375rem] -translate-y-1/2 rounded top-0 left-0 w-full bg-[#F1F1F1]`}
        />
        <div
          style={{
            backgroundColor: color,
            width: `${percent * 100}%`,
          }}
          className={`absolute h-[0.375rem] -translate-y-1/2 rounded top-0 left-0 `}
        />
        <div
          style={{ left: `${percent * 100}%` }}
          className="w-[0.875rem] h-[0.875rem] -translate-y-1/2 -translate-x-1/2 absolute top-0  bg-white rounded-full"
        ></div>
      </div>
      <p className="font-medium">100%</p>
    </HStack>
  );
};
