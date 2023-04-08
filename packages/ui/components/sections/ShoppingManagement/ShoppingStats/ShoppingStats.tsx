import { useUserData } from "@UI/../hooks";
import { mapArray, randomNum } from "@UI/../utils/src";
import { NumberShortner } from "@UI/components/helpers";
import {
  SalesStatisticsCard,
  CustomTooltip,
  CustomXAxisTick,
  CustomYAxisTick,
  getRandomHotelRoomName,
} from "@features/Statistics";
import {
  SelectOption,
  HexagonStatsIcon,
  ReturnArrowIcon,
  PersonGroupIcon,
  PriceDisplay,
  EyeIcon,
  HStack,
  Select,
  Divider,
  Image,
  CashBackIcon,
} from "@partials";
import React from "react";
import { useTranslation } from "react-i18next";
import { AreaChart, XAxis, YAxis, Tooltip, Area } from "recharts";
import { startCase } from "lodash";
import { ServiceType } from "@features/API";
import MoneyHandIcon from "@UI/components/partials/icons/MoneyHandIcon";
import { useResponsive } from "@src/index";

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

export const ShoppingStats: React.FC<{
  accountId: string;
}> = ({ accountId }) => {
  const { isMobile } = useResponsive();
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
    amount: randomNum(20000),
  }));

  return (
    <div
      style={{
        gridTemplateColumns: "repeat(16,1fr)",
      }}
      className="grid gap-6 pb-16"
    >
      {/* overview stats */}
      <div
        style={{
          gridColumn: "span 16 / span 16",
        }}
        className="flex flex-col  gap-6"
      >
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
        <div className="gap-7 grid grid-cols-5">
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
            label="Spends"
            lastCycleLabel="last year"
            icon={<MoneyHandIcon className="text-2xl min-w-fit" />}
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

          <SalesStatisticsCard
            amount={25000}
            lastCycleAmount={30000}
            label="Cashback"
            lastCycleLabel="last year"
            icon={<CashBackIcon className="text-2xl min-w-fit" />}
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
      </div>

      <div className="h-[30.563rem] col-span-9 rounded-[0.625rem] bg-white overflow-hidden">
        <div className="flex flex-col w-full  gap-4 ">
          <div className="px-4 pt-4 flex flex-col w-full gap-4">
            <p className="font-semibold text-[1.375rem]">{t("Orders")}</p>
            <div className="w-full grid grid-cols-8 font-semibold">
              <p className="col-span-2">{t("Image")}</p>
              <p className="text-center">{t("Name")}</p>
              <p className="text-center">{t("Price")}</p>
              <p className="text-center">{t("Reward")}</p>
            </div>
          </div>
        </div>
        <Divider />
        <div className="px-4 w-full gap-4 font-medium grid grid-cols-8 h-full overflow-y-scroll pr-2 thinScroll ">
          {mapArray(services, (v, i) => (
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
                className="flex text-xs  items-center justify-center"
              >
                {startCase(v.status)}
              </p>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="flex flex-col col-span-7 gap-6">
        {/* recent orders */}
        <div className="h-[32rem] p-4 rounded-[0.625rem] bg-white overflow-hidden">
          <p className="font-semibold  text-[1.375rem]">{t("Recent Orders")}</p>
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

export const MyShoppingStats: React.FC = () => {
  const { user } = useUserData();

  return user ? <ShoppingStats accountId={user.id} /> : null;
};
