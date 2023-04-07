import {
  NumberShortner,
  calculateAmountPercentChange,
  mapArray,
  randomNum,
  runIfFn,
} from "utils";
import {
  Divider,
  EyeIcon,
  HStack,
  HexagonStatsIcon,
  PaperShoppingBagOutlineIcon,
  PersonGroupIcon,
  PriceConverter,
  PriceDisplay,
  ReturnArrowIcon,
  Select,
  SelectOption,
  TBody,
  THead,
  Table,
  Td,
  Th,
  Tr,
} from "@partials";
import { useUserData } from "@src/index";
import React from "react";
import { useTranslation } from "react-i18next";
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts";
import { random } from "lodash";
import { useGetServicesData } from "@features/Services";
import { ServiceStatus, ServiceType } from "@features/API";
import { Thead } from "@chakra-ui/react";

function getRandomHotelRoomName(): string {
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
  status: ServiceStatus;
}[] = [...Array(10)].map((_, i) => ({
  name: getRandomHotelRoomName(),
  discount: randomNum(100),
  earning: randomNum(20000),
  price: 180,
  status: ServiceStatus.Active,
  type: ServiceType.Hotel,
  views: randomNum(10000),
}));

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

  React.useEffect(() => {
    const w = ref.current?.getBoundingClientRect().width;
    const h = ref.current?.getBoundingClientRect().height;

    if (w && h) {
      setChartDims({ h, w });
    }
  }, [ref]);

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

  return (
    <div className="grid grid-cols-3">
      {/* overview stats */}
      <div className="flex flex-col col-span-3 gap-6">
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

        <div className="flex flex-col gap-12 w-full">
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

        <div className="flex flex-col border-b w-full gap-4 py-2">
          <div className="px-4">
            <p className="font-semibold text-[1.375rem]">{t("Services")}</p>
            <div className="w-full grid grid-cols-8 font-medium">
              <p className="col-span-2">{t("Service")}</p>
              <p>{t("Category")}</p>
              <p>{t("Price")}</p>
              <p>{t("Discount")}</p>
              <p>{t("Total earning")}</p>
              <p>{t("Views")}</p>
              <p>{t("Status")}</p>
            </div>
          </div>
        </div>
        <div className="px-4 w-full gap-4 font-medium grid grid-cols-8 overflow-y-scroll thinScroll h-80">
          {mapArray(services, (v, i) => (
            <React.Fragment key={i}>
              <p className="text-xl col-span-2 font-semibold">{v.name}</p>
              <p>{v.type}</p>
              <PriceDisplay price={v.price} compact decimel />
              <PriceDisplay price={v.discount} compact decimel />
              <PriceDisplay price={v.earning} compact decimel />
              <HStack>
                <EyeIcon />
                <p>{NumberShortner(v.views)}</p>
              </HStack>
              <p>{v.status}</p>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* customer/selling category stats */}

      {/* services/products stats */}

      {/* recent orders */}
    </div>
  );
};

const CustomYAxisTick = (props: any) => {
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
        fontWeight={"500"}
        fontSize={"15"}
        fill="#666"
      >
        {v}
      </text>
    </g>
  );
};

const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fontWeight={"500"}
        fontSize={"15"}
        fill="#666"
      >
        {payload.value}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  console.log({ payload });
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
    <div className="flex flex-col gap-3 px-3 py-[0.625rem]">
      <HStack>
        {runIfFn(Icon)}
        <p className="font-medium">{label}</p>
      </HStack>

      <HStack className="justify-between">
        <span className="font-medium">
          <PriceDisplay price={amount} decimel />
        </span>

        <span
          className={`text-xs font-medium ${
            isPositive
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

      <p className="text-[0.688rem] flex-wrap gap-1 flex text-[#87888C]">
        {t("Compared to")}{" "}
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
