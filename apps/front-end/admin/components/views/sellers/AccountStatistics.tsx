import React from "react";
import { NumberShortner, randomNum } from "utils";
import { useTranslation } from "react-i18next";
import { BiArrowToBottom, BiArrowToTop } from "react-icons/bi";
import {
  Bar,
  BarChart,
  CartesianGrid,
  CartesianAxis,
  Legend,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { AspectRatio, BoxShadow, HStack } from "@partials";

export const AccountStatistics: React.FC<{
  accountId: string;
}> = ({ accountId }) => {
  const { t } = useTranslation();
  const [overviewDims, setOverviewDims] = React.useState<{
    h: number;
    w: number;
  }>({
    h: 0,
    w: 0,
  });
  const [reachedDims, setReachedDims] = React.useState<{
    h: number;
    w: number;
  }>({
    h: 0,
    w: 0,
  });

  const [ageGenderDims, setAgeGenderDims] = React.useState<{
    h: number;
    w: number;
  }>({
    h: 0,
    w: 0,
  });

  const overviewRef = React.useRef<HTMLDivElement>(null);
  const reachedAudinesRef = React.useRef<HTMLDivElement>(null);
  const ageGenderRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (overviewRef.current) {
      const h = overviewRef.current.clientHeight;
      const w = overviewRef.current.clientWidth;

      setOverviewDims({ h, w });
    }
  }, [overviewRef]);

  React.useEffect(() => {
    if (reachedAudinesRef.current) {
      const h = reachedAudinesRef.current.clientHeight;
      const w = reachedAudinesRef.current.clientWidth;

      setReachedDims({ h, w });
    }
  }, [reachedAudinesRef]);

  React.useEffect(() => {
    if (ageGenderRef.current) {
      const h = ageGenderRef.current.clientHeight;
      const w = ageGenderRef.current.clientWidth;

      setAgeGenderDims({ h, w });
    }
  }, [reachedAudinesRef]);

  const overviewdata: { x: number; y: number; z: number; name: string }[] = [
    ...Array(12),
  ].map((v, i) => ({
    name: new Date(new Date().setMonth(i)).toLocaleDateString("en-us", {
      month: "short",
    }),
    x: randomNum(400000),
    y: randomNum(200000),
    z: randomNum(300000),
  }));
  const totalAudienece = randomNum(2500000);

  const reachedData: { name: string; value: number; fill: string }[] = [
    {
      name: t("female"),
      value: randomNum(2500000),
      fill: "#EA4335",
    },
    {
      name: t("other"),
      value: totalAudienece,
      fill: "rgba(0, 0, 0, 0.0)",
    },
    {
      name: t("male"),
      value: randomNum(2500000),
      fill: "#4285F4",
    },
  ];

  const boxShadowStyles = {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 0px 40px rgba(0, 0, 0, 0.12)",
    borderRadius: "10px",
  };

  return (
    <div className="flex flex-col gap-14 w-full">
      <div className="flex gap-2 w-full">
        <StatisticsCard
          amount={2562156}
          prevAmount={1234658}
          title={t("Total of Visits")}
        />
        <StatisticsCard
          amount={2562156}
          prevAmount={1234658}
          title={t("Total of Followers")}
        />
        <StatisticsCard
          prevAmount={2562156}
          amount={1234658}
          title={t("Total of Likes")}
        />
        <StatisticsCard
          amount={2562156}
          prevAmount={1234658}
          title={t("Total of Comments")}
        />
        <StatisticsCard
          amount={2562156}
          prevAmount={1234658}
          title={t("Total of Saved")}
        />
      </div>
      <div className="grid grid-cols-12 gap-4 w-full">
        <div
          style={boxShadowStyles}
          className="p-6 col-span-7 flex flex-col gap-4 h-full"
        >
          <div className="flex items-center justify-between">
            <p className="font-bold text-xl">{t("Overview")}</p>
            <div className="flex flex-wrap items-center gap-8">
              <BarChartLegend color="#4285F4" name={t("Account Reached")} />
              <BarChartLegend color="#34A853" name={t("Account Engaged")} />
              <BarChartLegend color="#EA4335" name={t("Profile Activity")} />
            </div>
          </div>
          <div ref={overviewRef} className="flex flex-col h-80 gap-4 w-full">
            <BarChart
              width={overviewDims.w}
              height={overviewDims.h}
              data={overviewdata}
            >
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                legendType="none"
                dataKey="x"
                stackId={"1"}
                barSize={10}
                fill="#4285F4"
              />
              <Bar
                legendType="none"
                dataKey="y"
                stackId={"1"}
                barSize={10}
                fill="#34A853"
              />
              <Bar
                radius={[10, 10, 0, 0]}
                legendType="none"
                dataKey="z"
                stackId={"1"}
                barSize={10}
                fill="#EA4335"
              />
            </BarChart>
          </div>
        </div>
        <div style={boxShadowStyles} className="p-6 col-span-5 h-full">
          <div className="flex flex-col gap-1 w-full h-full">
            <p className="text-xl font-bold">{t("Reached Audience")}</p>
            <div className="flex gap-2 h-full items-center">
              <div className="flex flex-col gap-4">
                <BarChartLegend
                  amount={randomNum(150000)}
                  color="#EA4335"
                  name={t("Total of Women")}
                />
                <BarChartLegend
                  amount={randomNum(150000)}
                  color="#4285F4"
                  name={t("Total of Men")}
                />
              </div>

              <div
                ref={reachedAudinesRef}
                className="flex relative items-center justify-center h-full w-full"
              >
                <div className="absolute w-2/4 top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2">
                  <AspectRatio ratio={1}>
                    <div className="flex flex-col gap-2 justify-center h-full w-full items-center rounded-full bg-black bg-opacity-[0.12]">
                      <p>{t("Total of audience")}</p>
                      <p className="font-bold text-xl">
                        {Intl.NumberFormat("en-us", {
                          notation: "compact",
                        }).format(totalAudienece)}
                      </p>
                    </div>
                  </AspectRatio>
                </div>
                <PieChart width={reachedDims.h} height={reachedDims.h}>
                  <Pie
                    data={[
                      {
                        name: t("male"),
                        value: 350,
                        fill: "rgba(0, 0, 0, 0.12)",
                      },
                    ]}
                    innerRadius={100}
                    outerRadius={120}
                    paddingAngle={0}
                    dataKey={"value"}
                    isAnimationActive={false}
                  />
                  <Pie
                    data={reachedData}
                    innerRadius={100}
                    outerRadius={120}
                    paddingAngle={4}
                    dataKey={"value"}
                    cornerRadius={10}
                    animationBegin={90}
                  >
                    {reachedData.map((entry, index) => (
                      <Cell
                        radius={100}
                        key={`cell-${index}`}
                        fill={entry.fill}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid w-full grid-cols-2">
        <div style={boxShadowStyles} className="flex p-8 flex-col gap-8">
          <p className="font-bold text-xl">{t("Age and Gender")}</p>

          <div className="h-44" ref={ageGenderRef}>
            <></>
          </div>

          <HStack>
            <BarChartLegend color="#4285F4" name={t("Male")} />
            <BarChartLegend color="#91D4EF" name={t("Female")} />
          </HStack>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};

export const StatisticsCard: React.FC<{
  amount: number;
  title: string;
  prevAmount: number;
}> = ({ amount, prevAmount, title }) => {
  const change = (amount / prevAmount - 1) * 100;
  const positive = change > 0;
  return (
    <BoxShadow className="w-full">
      <div className="w-full px-4 py-2 rounded bg-[#F3F3F3] min-h-[6rem] flex flex-col justify-between">
        <p className="font-bold text-sm">{title}</p>
        <div className="w-full items-center flex justify-between">
          <div
            className={`${
              positive
                ? "text-primary bg-primary-100"
                : "text-secondaryRed bg-red-100"
            } flex items-center px-1 rounded`}
          >
            {positive ? <BiArrowToTop /> : <BiArrowToBottom />}
            {Math.floor(change)}%
          </div>
          <p className="font-bold text-lg">{NumberShortner(amount)}</p>
        </div>
      </div>
    </BoxShadow>
  );
};

export const BarChartLegend: React.FC<{
  name: string;
  amount?: number;
  color: string;
}> = ({ amount, name, children, color }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <div
          style={{
            backgroundColor: color,
          }}
          className="w-8 h-4 rounded"
        />
        <p className="whitespace-nowrap">{name}</p>
      </div>
      {amount ? <p className="font-bold">{NumberShortner(amount)}</p> : null}
    </div>
  );
};
